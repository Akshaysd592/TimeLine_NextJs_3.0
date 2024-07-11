import mongoose from "mongoose";



type ConnectionObject = { // for value returned after db connection 
    isConnected?:number // ? =>  means optional else number type 
} // like an interface 

const connection: ConnectionObject = {} // empty object created with assigned type ConnectionObject


async function dbConnect():Promise<void>{ // here void means doesn't matter what type of data is returned db return promise since async process
     if(connection.isConnected){ // checking whether already connected
        console.log("Already connected to database")
        return 
     }

     try { // if not connected then make db connection
      // console.log("started db connection")
      // const db =   await mongoose.connect(process.env.MONGODB_URI || ""
      //       // other options can also be provided 
      //   )
        const db =  await mongoose.connect(process.env.MONGODB_URI || "",{
            
        })
      //   console.log("ended connection")
      //   console.log(db)
      connection.isConnected = db.connections[0].readyState

      console.log("DB connected successfully...");

        
     } catch (error) {
        console.log("Database connection Failed")
        process.exit(1); // exiting process 
        
     }
}


export default dbConnect ;

