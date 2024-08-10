import UserModel from "@/model/User.model";
import dbConnect from "@/lib/dbConnect";
import { Message } from "@/model/User.model";

export async function POST(request: Request){
    await dbConnect()

    const {username, content} = await request.json()
   console.log(username,content)
    try {
        const user = await UserModel.findOne({username})
        console.log(user)
        if(!user){
            return Response.json({
                success:false,
                message:"User not found "
            },{
                status:404
            })
        }
         // is user accepting the messages
         if(!user.isAcceptingMessages){
            return Response.json({
                success:false,
                message:"User is not accepting the messages"
            },{status:403})
        }
  
        const newMessage = {content, createdAt : new Date()}
        user.messages.push(newMessage as Message) // providing Message means data will be of interface Message 

        await user.save();

        return Response.json({
            success:true,
            message:"message send successfully"
        },{status:200})



       
        
    } catch (error:any) {
        console.log("An unexpected error occured while sending message",error)

        return Response.json({
            success:false,
            message:error.message
        },{
            status:500
        })
        
    }


}