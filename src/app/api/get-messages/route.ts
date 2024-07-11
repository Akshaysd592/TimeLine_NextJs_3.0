import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/model/User.model";
import dbConnect from "@/lib/dbConnect";
import { User } from "next-auth";
import mongoose from "mongoose";




export async function GET(request  : Request){
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

    // const userId = user._id // this is available in string format 
    // for aggregate pipeline need mongoose object formed id
    const userId = new mongoose.Types.ObjectId(user._id)

    try {
        const user =await UserModel.aggregate([
            {  $match:{_id:userId} },
            {  $unwind:'$messages' }, // messages will be an array so need individual item of the array for provided id 
            {  $sort: {'messages.createdAt':-1 }},
            {  $group:{_id : '$_id', messages:{$push:'$messages'}}} // creating single object with same id and multiple messages in it 

        ])

        if(!user || user.length === 0){
            return Response.json({
                success:false,
                message:'User Not found '
            },{
                status:401
            })
        }
        
        return Response.json({
            success:true,
            messages: user[0].messages // due to group
        },{
            status:200
        })


    } catch (error) {
        console.log("Not able to return messages")
        return Response.json({
            success:false,
            message: "Not able to return messages"
        },{
            status:500
        })
        
    }

}