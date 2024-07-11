import mongoose ,{Schema, Document } from "mongoose";


export interface Message extends Document { // interface creation which uses Document
    content: string; // in interface small lettered 
    createdAt: Date ;
}


const MessageSchema : Schema<Message> = new Schema({
    content:{
        type:String, // in mongoose capitalized string
        required:true
    },
    createdAt:{
        type:Date,
        required: true,
        default: Date.now
    }
})

// Can also declare another schema in same model file itself


export interface User extends Document  { // there is inconsistency in type provide in typescript 
                                        // ; seperated
    username: string;
    email  : string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry : Date;
    isVerified:boolean;
    isAcceptingMessages: boolean;
    messages : Message[];

}


const UserSchema : Schema<User> = new Schema({
    username:{
        type:String,
        required: [true, "Username is required"],
        trim:true,
        unique:true
    },
    email:{
        type : String,
        required: [true,"Email is required"],
        unique:true,
        match:[/^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm,"Please provide a valid email"] // use regexr for reference regex 
    },
    password:{
        type: String,
        required: [true,"Password is required"]
    },
    verifyCode:{
        type: String,
        required:[true,"Verify Code is required"]
    },
    verifyCodeExpiry:{
        type: Date,
        required:[true,'Verify code exipiry is required']
    },
    isVerified:{
          type: Boolean,
          default:false,
    },
    isAcceptingMessages:{
        type: Boolean,
        default:true,
    },
    messages:{
        type:[MessageSchema] // array of messages from MessageSchema
    }
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) // for existing schema as User available
                   || mongoose.model<User>("User",UserSchema) // create new model 

export default UserModel 