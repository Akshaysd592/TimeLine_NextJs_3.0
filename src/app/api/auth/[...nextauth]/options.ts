import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";

import bcrypt from 'bcryptjs'
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";

export const authOptions : NextAuthOptions = {
   providers:[
        CredentialsProvider({ // creadential are created so that there is a formation of page for this provided value such as github based login
            id:"credentials",
            name:"Credentials",
            credentials:{ // for html form created automatically by next-auth
                email : {label:"Email",type:"text"},
                password:{label:"password",type:"password"}
            },
            async authorize(credentials:any):Promise<any>{
                await dbConnect();
                try { // to make authorize 
                   const user  =  await UserModel.findOne({
                        $or:[
                            {
                                email: credentials.identifier
                            },
                            {
                                username:credentials.identifier
                            }
                        ]
                    })

                    if(!user) {
                        throw new Error("No User found with this email ")
                    }

                    if(!user.isVerified){
                        throw new Error("Please verify your account before login")
                    }

                  const isPasswordCorrect =   await bcrypt.compare(credentials.password, user.password)

                  if(isPasswordCorrect){
                    return user // according to documentation
                  }else{
                    throw new Error("Incorrect Password")
                  }
                    
                } catch (error:any) {
                    throw new Error(error)
                }

            }
        }),
    ],
    callbacks:{ // here user will be proveded from providers/credentails
        async jwt({ token, user }) { // token will have only id but we want more things to be stored in token so 
                                    // custumising its structure inside types/next-auth.ts and also store same data in session also
            if(user){ // changed structure like types/next-auth.d.ts for this storage of data 
                token._id = user._id?.toString()
                token.isVerified = user.isVerified
                token.isAcceptingMessages= user.isAcceptingMessages
                token.username  = user.username
            }

            return token ;
         },
        async session({ session, token }) {

            if(token){ // similar to above make interface changes
                session.user._id = token._id
                session.user.isVerified = token.isVerified
                session.user.isAcceptingMessages = token.isAcceptingMessages
                session.user.username = token.username
            }
            return session
        }
        
    },
    pages:{
        signIn:'/sign-in'
    },
    session:{
        strategy:'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,

    
};