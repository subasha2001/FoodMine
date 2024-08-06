import { connect, ConnectOptions } from "mongoose";
//we needed a connection to the mongodb server, so we import

export const dbConnect = () =>{
    connect(process.env.MONGO_URL!, {
        useNewUrlParser: true,
        useUnifiedTopology: true  //these are promises
    } as ConnectOptions).then(
        ()=> console.log('connected successfully'),
        (error)=>console.log(error)
    )
    //this will get the value that we defined in the env file
    //we put ! to say it is always available not undefined
}