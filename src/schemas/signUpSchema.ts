import {z} from 'zod'
// for validation of data , it will work before storage of data in mongodb database


export const userNameValidation = z // not created object because of single validation of username only
            .string()
            .min(2,"Username must be at least 2 characters")
            .max(20,"Username must be not more than 20 characters")
            .regex(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm, "User name must not contain special character")




export const signUpSchema = z.object({ //  object creation because of multiple things need to be validated
      username:  userNameValidation,
      email : z.string().email({message:"Invalid Email Added "}),
      password : z.string().min(6,{message:"Password must be at least 6 characters "})
}
) 