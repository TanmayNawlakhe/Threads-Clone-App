'use server';

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { connect } from "http2";
import Thread from "../models/thread.model";
import { getJsPageSizeInKb } from "next/dist/build/utils";
import { FilterQuery, Query, SortOrder } from "mongoose";

interface Paramas{
    userId:string;
    username:string;
    name:string;
    bio:string;
    image:string;
    path:string;

}

export async function updateUser({userId, username, name, bio, image, path}:Paramas): Promise<void>{
    connectToDB();

    try{
        await User.findOneAndUpdate({id:userId},
            {username:username.toLowerCase(),
                name,
                bio,
                image,
                onboarded:true,
            },
            {upsert:true}
        );
    
        if(path === '/profile/edit'){
            revalidatePath(path);
        }
    }catch(e:any){
        throw new Error(`Failed to create/update user: ${e.message}`)
    }

   


}

export async function fetchUser(userId:string){

    try{
        connectToDB();
        return await User.findOne({id:userId})
        // .populate({
        //     path:'communities',
        //     model:Community
        // });
    
    }catch(e:any){
        throw new Error(`Failed to fetch user: ${e.message}`)
    }

   


}

export async function fetchUserPosts(userId:string){
    try{
        connectToDB();

        const threads = await User.findOne({id:userId})
        .populate({
            path:'threads',
            model: Thread,
            populate:{
                path:'children',
                model:Thread,
                populate:{
                    path:'author',
                    model:User,
                    select:'name image id'
                }
            }
        })

        return threads;

    }catch(e:any){
        throw new Error(
            `Failed to fetch user posts :${e.message}`
        )
    }
}

export async function fetchUsers({
    userId,
    searchString="",
    pageNumber=1,
    pageSize=20,
    sortBy = "desc"
}:{
    userId:string;
    searchString?:string;
    pageNumber?:number;
    pageSize?:number;
    sortBy?:SortOrder;
}){
    try{
        connectToDB();
        const skipAmount = (pageNumber -1)* pageSize;
        const regex = new RegExp(searchString, "i");

        const query:FilterQuery <typeof User> = {
            id:{$ne:userId}
        }
        if(searchString.trim() !== ''){
            query.$or = [
                {username:{$regex:regex}},
                {name:{$regex:regex}}
            ]
        }

        const sortOptions = {createdAt:sortBy}
        const usersQuery = User.find(query)
        .sort(sortOptions)
        .skip(skipAmount)
        .limit(pageSize);

        const totalUserscount =await User.countDocuments(query);

        const users= await usersQuery.exec();
        const isNext= totalUserscount > skipAmount + users.length;
        return{users,isNext};

        
    }catch(e:any){
        throw new Error(`Failed to fetch users : ${e.message}`)

    }
}

export async function getActivity(userId:string){

    try{
        connectToDB();

        //find all threads created by user
        const userthreads = await Thread.find({author:userId});

        //collect all child thread ids 
        const childthreadIds = userthreads.reduce((acc, userthread)=>{
            return acc.concat(userthread.children);
        }, []);


        const replies = await Thread.find({
            _id:{$in:childthreadIds},
            author:{$ne:userId}
        }).populate({
            path:'author',
            model:User,
            select:"name image _id"
        })

        return replies;

    }catch(e:any){
        throw new Error(`Failed to get activites : ${e.message}`)
    }


}