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

import dayjs from "dayjs";
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
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Message } from "@/model/User.model";

import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";

import { useToast } from "./ui/use-toast";

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void; // type method
};

export function MessageCard({ message, onMessageDelete }: MessageCardProps) {
  const { toast } = useToast();

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete<ApiResponse>(
        `/api/delete-message/${message._id}`
      );

      toast({
        title: response.data.message,
      });

      onMessageDelete(`${message._id}`);
      // onMessageDelete(message._id)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message;

      toast({
        title: "Error in messsageCard",
        description: errorMessage ?? "Failed to delete Message",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="caret-gray-600 border-slate-800  dark:bg-white dark:text-black ">
      <CardHeader className="flex flex-row items-center justify-between " >
        <div>
          <div className="">
            <CardTitle>{message.content}</CardTitle>
          </div>

          <div>{dayjs(message.createdAt).format("MMM D, YYYY h:mm A")}</div>
        </div>
        <div>
        <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive"><X className="w-8 h-8"/></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete 
             message and can not be recovered.
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

        </div>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}

export default MessageCard;
