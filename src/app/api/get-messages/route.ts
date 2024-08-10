// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/options";
// import UserModel from "@/model/User.model";
// import dbConnect from "@/lib/dbConnect";
// import { User } from "next-auth";
// import mongoose from "mongoose";




// export async function GET(request  : Request){
//     await dbConnect()
//     // const session = await getServerSession(authOptions)
//     // const user : User = session?.user as User
    
//     const session  = await getServerSession(authOptions)
//     const user:User = session?.user as User

//     // if(!session || !session.user){
//     //     console.log("inside not authorized")
//     //     return Response.json({
//     //         success:false,
//     //         message:"Not Authenticated ",
//     //     },{
//     //         status: 401
//     //     })
//     // }

//     // const userId = user._id // this is available in string format 
//     // for aggregate pipeline need mongoose object formed id
//     const userId = new mongoose.Types.ObjectId(user._id)
//     console.log(userId, "userid")

//     try {
//         const user =await UserModel.aggregate([
//             {  $match:{_id:userId} },
//             {  $unwind:'$messages' }, // messages will be an array so need individual item of the array for provided id 
//             {  $sort: {'messages.createdAt':-1 }},
//             {  $group:{_id : '$_id', messages:{$push:'$messages'}}} // creating single object with same id and multiple messages in it 

//         ]).exec()
        

//         if(!user){
//             return Response.json({
//                 success:false,
//                 message:'User Not found '
//             },{
//                 status:401
//             })
//         }
        
//         return Response.json({
//             success:true,
//             messages: user[0].messages // due to group
//         },{
//             status:200
//         })


//     } catch (error) {
//         console.log("Not able to return messages")
//         return Response.json({
//             success:false,
//             message: "Not able to return messages"
//         },{
//             status:500
//         })
        
//     }

// }
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User.model';
import mongoose from 'mongoose';
import { User } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';

export async function GET(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const _user:any = session?.user;

  if (!session || !_user) {
    return Response.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }
  const userId = new mongoose.Types.ObjectId(_user._id);
  console.log(userId)
  try {
    // const user = await UserModel.findById(userId)
    
  const user = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: '$messages' },
      { $sort: { 'messages.createdAt': -1 } },
      { $group: { _id: '$_id', messages: { $push: '$messages' } } },
    ]).exec();



    console.log(user)
    if (!user ) {
      return Response.json(
        { message: 'User not found', success: false },
        { status: 404 }
      );
    }

    return Response.json(
      { messages: user[0].messages},
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return Response.json(
      { message: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}