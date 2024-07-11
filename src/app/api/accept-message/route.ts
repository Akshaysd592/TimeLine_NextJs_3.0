import { getServerSession } from "next-auth"; // gor getting data from server
import { authOptions } from "../auth/[...nextauth]/options";


import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { User } from "next-auth"; // for type checking 
// sign in handled by next-auth so using it's token or session for getting user details 

export async function POST(request:Request){
    await dbConnect();

    const session  = await getServerSession(authOptions)
    const user:User = session?.user as User

    if(!session || !session.user){
        return Response.json({
            success:false,
            message:"Not Authenticated"
        },{
            status:401
        })
    }

    const userId = user._id
    const {acceptingMessage} = await request.json()





    try {
      const updatedUser =   await UserModel.findByIdAndUpdate(
            userId,
            {isAcceptingMessages:acceptingMessage},
            {new:true}
        )
    if(!updatedUser){
        return Response.json({
            success:false,
            message:"Failed to update user status to accept message"
        },{status:401})
    }

    return Response.json({
        success:true,
        message:"Message acceptance status updated successfully",
        updatedUser
    },{
        status:200
    })


    } catch (error) {
        console.log("Failed to update user status to accept messages")
        return Response.json({
            success:false,
            message:"Failed to update user status to accept messages"
        },{
            status : 500
        })
        
    }


}



export async function GET(request:Request){
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user : User = session?.user as User
    if(!session || !session.user){
        return Response.json({
            success:false,
            message:"Not Authenticated in accept message"
        },{status:401})
    }

    const userId = user._id

    try {
        const foundUser = await UserModel.findById(userId)

        if(!foundUser){
            return Response.json({
                success:false,
                message:"User not found"
            },{
                status:404
            })
        }


        return Response.json({
            success:true,
            isAcceptingMessages: foundUser.isAcceptingMessages
        },{
            status:200
        })
        
    } catch (error) {
        console.log("Error in getting message acceptance status")

        return Response.json({
            success:false,
            message:"Error in getting message acceptance status"
        },{
            status:500
        })

        
    }
     
}

