import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";

export async function POST(request:Request){
   await  dbConnect()
    try {
    const {username,code} = await request.json()

  const decodedUserName =   decodeURIComponent(username) // for decoding data coming like special symbols changes to %20 that need to be decoded

     const user =   await UserModel.findOne({
            username : decodedUserName
        })

        if(!user){
            return Response.json({
                success:false,
                message:"User not found"
            },{
                status:500
            })
        }

        const isCodeValid = user.verifyCode === code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

        if(isCodeValid && isCodeNotExpired){
            user.isVerified = true
            await user.save()
            return Response.json({
                success:true,
                message: "User verified successfully"
            },{
                status:200
            })
        } else if(!isCodeNotExpired){ // if code expired
                return Response.json({
                    success:false,
                    message:"Verification code is expired , Please signup again to get a new code "
                },{
                    status : 400
                })
        }else {
            return Response.json({
                success:false,
                message:"Invalid verification code "
            },{
                status : 400
            })
        }
        
    } catch (error) {
        console.log("Error while verifying user",error)
        return Response.json({
            success:false,
            message:"Error verifying user"
        },{
            status:500
        })
    }
}