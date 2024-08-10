import { resend } from "@/lib/resend"; // import resend objection created
// import verification email template from emails folder
import VerificationEmail from "../../emails/VerificationEmailTemplate";

import { ApiResponse } from "@/types/ApiResponse"; //interface created in it


export async function sendVerificationEmail(
    email: string,
    username:string,
    verifyCode: string,
):Promise<ApiResponse>{ // this means need to return the data similar to ApiResponse type
    try {
        const emailResponse = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: [email],
            subject: "Getline | Verification Email",
            react: VerificationEmail({username,otp:verifyCode}),
          });

        return {
            success:true,
            message:"Verification email send successfully"
        }
    } catch (emailError) {
        console.log("Error while sending verification Email",emailError)
        return {
            success:false,
            message:"Failed to send verification Email"
        }
        
    }
}