import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";

interface Props {
    currentUserId:string;
    accountId:string;
    accountType:string;
}

const ThreadsTab = async ({currentUserId, accountId,accountType}:Props)=>{

    let res = await fetchUserPosts(accountId);

    if(!res){redirect('/')}


    return (
        <section className="mt-4 flex flex-col gap-7">
            {res.threads.map((post:any)=>(
                <ThreadCard
                key={post._id}
              id={post._id}
              currentUserId={currentUserId}
              parentId={post.parentId}
              content={post.text}
              author={accountType === 'User'
                ? {
                    name:res.name,
                    image:res.image,
                    id:res.id,
                }:{
                    name:post.author.name,
                    image:post.author.image,
                    id:post.author.id
                }
              }
              community={post.community}
              createdAt = {post.createdAt}
              comments={post.children}
                />
            ))}
        </section>
    )
}
export default ThreadsTab;