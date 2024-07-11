
'use client'
import React from 'react'

export default function DashBoard() {
  return (
    <div>page</div>
  )
}

// import { useToast } from "@/components/ui/use-toast";
// import { acceptMessageValidation } from "@/schemas/acceptMessageSchema";
// import { ApiResponse } from "@/types/ApiResponse";
// import { zodResolver } from "@hookform/resolvers/zod";
// import axios, { AxiosError } from "axios";
// import { User } from "next-auth";
// import { useSession } from "next-auth/react";
// //keep consistency in code means if using react-hook-form for form related handling then use react-hook-form only

// import React, { useCallback, useEffect, useState } from "react";
// import { Message, useForm } from "react-hook-form";
// import * as z from "zod";

// function page() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSwitchLoading, setIsSwitchLoading] = useState(false);

//   const { toast } = useToast();

//   // optimistic ui => exa :  for user it shows that you liked post but in backend it will take time if error then will make it as it is earlier
//   const handleDeleteMessage = (messageId: string) => {
//     setMessages(messages.filter((message) => message._id !== messageId));
//   };

//   const { data: session } = useSession();
//   const form = useForm<z.infer<typeof acceptMessageValidation>>({
//     resolver: zodResolver(acceptMessageValidation),
//   });

//   // extract values from form
//   const { register, watch, setValue } = form;

//   const acceptMessages = watch("acceptMessages");

//   const fetchAcceptMessage = useCallback(async () => {
//     // useCallback is used for storing values is make changes in earlier values for obtising and less db call

//     setIsSwitchLoading(true);
//     try {
//       const response = await axios.get<ApiResponse>("/api/accept-message");
//       setValue("acceptMessages", response.data.isAcceptingMessage!);
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;

//       toast({
//         title: "Error",
//         description:
//           axiosError.response?.data.message ||
//           "Failed to fetch message settings",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }, [setValue]);

//   const fetchMessage = useCallback(async (refresh: boolean = false) => {
//       setIsLoading(true);
//       setIsSwitchLoading(true);
//       try {
//         const apiresponse = await axios.get<ApiResponse>("/api/get-messages");

//         setMessages(apiresponse.data.message || []);
//         if (refresh) {
//           toast({
//             title: "Refreshed messages",
//             description: "Showing latest Messages",
//           });
//         }
//       } catch (error) {
//         toast({
//           title: "Error in refreshing messages",
//           description: "Failed to fetch message setting",
//         });
//       } finally {
//         setIsLoading(false);
//         setIsSwitchLoading(false);
//       }
//     },
//     [setIsLoading, setMessages]
//   );

//   useEffect(()=>{
//      if(!session || !session.user) return 
//      fetchMessage()
//      fetchAcceptMessage()


//   },[session, setValue, fetchAcceptMessage, fetchMessage])

//    // handle switch change
//    const handleSwitchChange = async()=>{
//     try {
//      const response =    await axios.post<ApiResponse>('/api/accept-messages',{
//          acceptMessages: !acceptMessages
//         })
//         setValue('acceptMessages', !acceptMessages)

//         toast({
//          title: response.data.message,
//          variant:'default'
//         })
//     } catch (error) {
//        const axiosError = error as AxiosError<ApiResponse>
//        toast({
//           title:"Error",
//           description: axiosError.response?.data.message ||
//                        "Failed to fetch message settings",
//           variant:'destructive'
//        })
     
//     }
//   }

//   const {username} = session?.user as User

//   const baseUrl = `{window.location.protocol}//${window.location.host}`

//   const profileUrl = `${baseUrl}/u/${username}`

//   const copyToClipboard = ()=>{
//     navigator.clipboard.writeText(profileUrl)
//     toast({
//       title:"URL copied ",
//       description:"Profile URL has been copied to clipboard"
//     })

//   }


//   if(!session || !session.user){
//     return <div>
//      Please Login
//     </div>
//   }

//   return (
//     <div>

//     </div>
//   );
// }

// export default page;
