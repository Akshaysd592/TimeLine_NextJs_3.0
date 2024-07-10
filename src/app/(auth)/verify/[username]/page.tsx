'use client'
import { useToast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import * as z from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifySchemaValidation } from "@/schemas/verifySchema";
import axios, { AxiosError } from "axios";
import { Description } from "@radix-ui/react-toast";
import { ApiResponse } from "@/types/ApiResponse";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function VerifyAccount() {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof verifySchemaValidation>>({
    resolver: zodResolver(verifySchemaValidation),
  });

  const onSubmit = async (data: z.infer<typeof verifySchemaValidation>) => {
    try {
      const response = await axios.post("/api/verify-code", {
        username: params.username, // that's why used [username] folder for username get in parameter
        code: data.code,
      });

      toast({
        title: "success",
        description: response.data.message,
      });

      router.replace("/sign-in");
    } catch (error) {
      console.log("Error while verification of code", error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;

      toast({
        title: "Code verification failed",
        description: errorMessage
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md ">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 ">
            Verify Your Account
          </h1>
          <p>Enter the verification code sent to your email</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification code</FormLabel>
                  <FormControl>
                    <Input placeholder="OTP code" {...field} />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
