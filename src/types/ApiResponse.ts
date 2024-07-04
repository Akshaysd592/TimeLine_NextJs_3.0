//imported Message interface 
import { Message } from "@/model/User.model";


// creating a template to make sure that this type of response should be returned
export interface ApiResponse {
    success:boolean;
    message: string;
    isAcceptingMessage?:boolean;
    messages?:Array<Message> //optional
    
}