"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Message } from "@/model/User.model";

import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Toast } from "@radix-ui/react-toast";
import { useToast } from "./ui/use-toast";

  
type MessageCardProps = {
    message: Message
    onMessageDelete : (methodId: string)=> void // type method

}


function MessageCard({message,onMessageDelete}:MessageCardProps) {
    const {toast} = useToast()

    const handleDeleteConfirm  = async()=>{
    try {
         const response = await  axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
    
          toast({
            title: response.data.message
          })
    
          onMessageDelete(`${message._id}`)


    } catch (error) {
    
        const axiosError  = error as AxiosError<ApiResponse>
        const errorMessage = axiosError.response?.data.message

        toast({
            title:"Error in messsageCard",
            description: errorMessage
        })
        
    }

    }






  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <AlertDialog>

      <AlertDialogTrigger asChild>
        <Button variant="destructive"><X className="w-5 h-5"/></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
          onClick={handleDeleteConfirm}
          >Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}

export default MessageCard;
