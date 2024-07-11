import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { sendVerificationEmail } from "@/helper/sendVerificationEmail";

import bcrypt from 'bcryptjs'

export async function POST(request : Request){
    await dbConnect() // db connection started
    try {
        const {username, email,password} = await request.json()

        const existingUserVerifiedByUserName  = await UserModel.findOne({
            username,
            isVerified : true
        })
        
        // to check already user exist with the provided username 
        if(existingUserVerifiedByUserName){ // prefered to use long variable names
            return Response.json({
                success:false,
                message:"UserName already taken ..."
            },{
                status:400
            })
        }

       
       const existingUserByEmail = await UserModel.findOne({email})

    // verifyCode generation  from range of 100000 to 900000 six digits
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

     // if user exists but not verified using otp 
       if(existingUserByEmail){

             // already user exits and also  verified using otp
             if(existingUserByEmail.isVerified){
                return Response.json({
                    success:false,
                    message:"User already exist with this email"
                },{
                    status:400
                })
             }
             else { // if user already exist but not verified with otp

                const hashedPassword = await  bcrypt.hash(password,10)

                existingUserByEmail.password = hashedPassword
                existingUserByEmail.verifyCode = verifyCode // saving verification code so that can verify it with the code on the email 
                // const expiryDate = new Date()
                // expiryDate.setHours(expiryDate.getHours()+1);
                // existingUserByEmail.verifyCodeExpiry = expiryDate //or
                existingUserByEmail.verifyCodeExpiry  = new Date(Date.now() * 3600000)


                await existingUserByEmail.save()


             }


       }else{
                // here new user , so store its values and send mail with otp for verification
                const hashedPassword =  await bcrypt.hash(password,10)
                const expiryDate = new Date(); 
                expiryDate.setHours(expiryDate.getHours()+1) // adding 1 hr for expiry

            const newUser =   new UserModel({
                    username,
                    email,
                    password:hashedPassword,
                    verifyCode,
                    verifyCodeExpiry:expiryDate,
                    isVerified:false,
                    isAcceptingMessages:true,
                    message:[] // initially empty
                })

                await newUser.save()
       }

            // sending mail for verification with otp 

            const emailResponse = await  sendVerificationEmail(email,username,verifyCode)

            if(!emailResponse.success){ // if email not sent successfully
                return Response.json({
                    success:false,
                    message: emailResponse.message
                },{
                    status:500
                })
            }

            // If email sent successfully
            return Response.json({
                success:true,
                message:"User registered successfully"
            },{
                status:200
            })


    } catch (error) {
        console.error("Error Resistering user",error) // showing in backend 
        return Response.json( // sending response to frontend 
            {
                success:false,
                message:"Error while registering user  "
            },{
                status: 500
            }
        )
        
    }

}