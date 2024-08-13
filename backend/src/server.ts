import dotenv from 'dotenv';
dotenv.config(); //before configuring we should check MONGO_URL is present or not

import express from "express"
import cors from "cors"  //we use cors to run backend in different port(localhost:5000)
import foodRouter from './Routers/food.router'
import userRouter from "./Routers/user.router";
import orderRouter from './Routers/order.router'
import { dbConnect } from './configs/database.config';
dbConnect();

  // nodemon automaticall use ts-node if we give it a ts file //

const app = express();  //we are going to define all apis using this application
app.use(express.json());//express doesnt support json, so we should enable it
app.use(cors({          //express says cors to have a req on this server and credentials true
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
//here the express will move the req into the foodRouter

const port = 5000;

app.listen(port, ()=>{       //function works when the listening is completed
    console.log("Website server on http://localhost:" + port);
})
