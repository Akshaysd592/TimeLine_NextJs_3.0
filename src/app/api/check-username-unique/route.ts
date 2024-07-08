import dbConnect from "@/lib/dbConnect";
import {z} from "zod"
import UserModel from "@/model/User.model";
import { userNameValidation } from "@/schemas/signUpSchema";

 // validating username is according to zod schema declared if in proper 
 // formate then making backend call to check username already exist and also verified
 // else allow to take the username 

const UserNameQuerySchema = z.object({
    username: userNameValidation
})

export async function GET(request: Request){
    await dbConnect()
  

    try {
        // if(request.method !== 'GET'){ // this is not required now in latest version
        //     return Response.json({ 
        //         success:false,
        //         message:"Method is not allowed"
        //     },{
        //         status:405
        //     })
        // }
        const {searchParams} = new URL(request.url)
        const queryParam = {
            username:searchParams.get('username') // localhost:3000/username?="akshay"
        }

        // validate with zod 
      const result = UserNameQuerySchema.safeParse(queryParam) // if correct schema then allow to work 
        console.log(result)

       if(!result.success){
        const usernameError = result.error.format().username?._errors || []
        return Response.json({
            success:false,
            message: usernameError?.length >0? 
                        usernameError.join(','): "Invalid query parameters"
             },
            {
                status:400
            })
       }

        const {username} = result.data  

     const existingVerifiedUser =  await  UserModel.findOne({username, isVerified:true})

     if(existingVerifiedUser){
        return Response.json({
            success:false,
            message:"Username is already taken"
        },{
            status:400
        })
     }


        return Response.json({
            success:true,
            message:" Username is unique"
        },{
            status:200
        })


      
        
    } catch (error) {
        console.log("Error checking username",error)
        return Response.json({
            success:false,
            message:"Error checking username"
        },{
            status:500
        })
    }
}