
'use client';

import {Form} from "@/components/ui/form"
import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import { CommentValidation } from "@/lib/validations/thread";
import * as z from 'zod';

import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input";
// import { updateUser } from "@/lib/actions/user.actions";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";
// import { createThread } from "@/lib/actions/thread.actions";

interface Props{
    threadId:string;
    currentUserImg:string;
    currentUserId:string;
}
const Comment =  ({threadId, currentUserImg, currentUserId}: Props) =>{
    const pathname = usePathname();
        const router = useRouter();
      
          const form = useForm({
              resolver: zodResolver(CommentValidation),
              defaultValues:{
                  thread:"",
              }
          });
    
    
          const onSubmit = async (values:z.infer<typeof CommentValidation>)=>{

            console.log("Starting comment submitting ... ")
            await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname);

            form.reset();    
          }

    return (
        <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">

                    <FormField
                            control={form.control}
                              name="thread"
                              render={({ field }) => (
                                <FormItem className=" flex items-center gap-3 w-full">
                                  <FormLabel >
                                    <Image src={currentUserImg} alt="Profile image" width={48} height={48} className="rounded-full object-cover"/>
                                  </FormLabel>
                                  <FormControl className="border-none bg-transparent">
                                    <Input type="text" className="no-focus text-light-1 outline-none" placeholder="Comment ..." {...field} />
                                  </FormControl>
                    
                                </FormItem>
                              )}
                            />

                            <Button type="submit" className="comment-form_btn cursor-pointer ">Reply
                            </Button>
              </form>
        </Form>
    )
}
export default Comment;