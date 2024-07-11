import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";


export async function DELETE(request: Request, {params}:{params:{messageid:string}}){
     await dbConnect()
     const session = await getServerSession(authOptions)
     const user : User = session?.user as User 

     if(!session || !session.user){
          return Response.json({
               success:false,
               message:"Not Authenticated",
           },{
               status: 401
           })
     }
     const messageId  = params.messageid
  
     try {
        const updatedResult =   await UserModel.updateOne(
               {_id : user._id},
               {$pull : {
                    messages:{
                         _id : messageId
                    }
               }}
          )
          if(updatedResult.modifiedCount == 0){
               return Response.json({
                    success:false,
                    message: "Message not founde or already delete"
               },{
                    status: 404
               })
          }

          return Response.json({
               success: true,
               message:"Message Deleted"
          },{
               status: 200
          })



     } catch (error) {
          console.log("Error in delete route ",error)
          return Response.json({
               success:false,
               message:"Error deleting message"
          },{
               status:500
          })
     }


}