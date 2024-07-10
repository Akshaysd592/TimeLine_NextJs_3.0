"use client";
import * as z from "zod";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { signInSchema } from "@/schemas/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const router = useRouter();
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    // signup seen in manual form. now, signIn different way since used nextauth in signIn in backend
     // directly function for signin is provided by nextauth
    const result =  await signIn('credentials',{
      redirect:false, //that nextauth should not redirect we are redicting it 
      identifier: data.identifier,
      password: data.password
     })
     
     if(result?.error){
      toast({
        title:" Login Failed",
        description:"Incorrect Username or Password",
        variant:"destructive"
      })
     }
     if(result?.url){
      router.replace('/dashboard')
     }
     
    setIsSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
        <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 '>
            Join Mystery Message GetLine
           </h1>
           <p className='mb-4'>
            Sign In to start your anonymous adventure
           </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <FormControl>
                    <Input placeholder=" Email/Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
            
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>Sign In</Button>
          </form>
        </Form>


      </div>
    </div>
  );
}
