"use client";

import React from "react";
import * as z from "zod";
import { messageSchema } from "@/schemas/messageSchema";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useForm  } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";




import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,

} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ApiResponse } from "@/types/ApiResponse";




function page() {
  const params = useParams<{ username: string }>();
  const {toast} = useToast();

    const {resetField} = useForm()

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const onSubmit = async (data:z.infer<typeof messageSchema>) => {
        try {
        const username = params.username;
        const content = data.content;

        console.log(username,content)

        let validatedContent = content.trim();
        if(!validatedContent){
          toast({
            title:"No content Provided",
            description:"Please, Provide some content"
          })
        }

        const response =  await axios.post('/api/send-message',{
           username,
           content

        })

        // console.log(response);
        // if(response? === "User is not accepting the messages"){

        // }
        
        if(response.data?.success){
          toast({
            title:"Message Sent Successfully"
          })

          resetField("content")
  
        }



       
          
        } catch (error) {
          console.log(error);
          const axiosMessage = error as AxiosError<ApiResponse>
          let errorMessage = axiosMessage.response?.data.message

          toast({
            title:"Can Not Send Message",
            description:"Please Try Again Later..."
          })


        }
          
        
  };

  return (
    <div className="flex justify-center items-center min-h-screen  bg-gray-400">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Feed-Back</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please provide your valuable feedback for our new product"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can <span>@mention</span> your users and organizations.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default page;
