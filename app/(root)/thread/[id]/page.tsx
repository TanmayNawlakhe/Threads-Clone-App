import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = async ({
    params 
}:{params:{id:string}}) =>{
    const user = await currentUser();
    if(!user) return null;

     const userInfo = await fetchUser(user.id);

     if(!userInfo?.onboarded) redirect('/onboarding')

    if(!params.id) return null;

    const post = await fetchThreadById(params.id);
    return (
    <section className="relative">
        <div>
        <ThreadCard
              key={post._id}
              id={post._id}
              currentUserId={user?.id || ""}
              parentId={post.parentId}
              content={post.text}
              author={post.author}
              community={post.community}
              createdAt = {post.createdAt}
              comments={post.children}
              />
        </div>


        <div className="mt-7">
            <Comment
            threadId = {post.id}
            currentUserImg = {userInfo.image}
            currentUserId = {JSON.stringify(userInfo._id)}
            />
        </div>

        <div className="mt-6">
            {
                post.children.map((childItem:any)=>(
                    <ThreadCard
              key={childItem._id}
              id={childItem._id}
              currentUserId={user.id}
              parentId={childItem.parentId}
              content={childItem.text}
              author={childItem.author}
               community={childItem.community}
              createdAt = {childItem.createdAt}
              comments={childItem.children}
              isComment
              />
                ))
            }
        </div>
    </section>
    )

}
export default Page;