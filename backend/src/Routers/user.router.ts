import {Router} from 'express';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { UserModel } from '../models/user.model';

const router = Router();

router.get('/seed', asyncHandler(
    async (req, res) => {
        const foodsCount = await UserModel.countDocuments();
        if(foodsCount>0){
            res.send("Seed is already done!")
            return;
        }

        await UserModel.create(sample_users);
        res.send("Seed is done!")
        //the connection btw db and oru code is asynchronized
    }
))
router.post('/login', asyncHandler(
    async (req, res)=>{  //we can send the body to the server
        const {email, password} = req.body
        const user = await UserModel.findOne({email, password})
    
        if(user){
            res.send(generateTokenResponse(user));
        }else{
            res.status(400).send("Username of Password not valid")
        }
    }
))     

const generateTokenResponse = (user:any)=>{
    const token =jwt.sign({                     //process of generating token is sign
        email:user.email, isAdmin: user.isAdmin  //first parameter is payload or what we want to encode 
    }, "SomeRandomText", {                       //second parameter is of sign fn(pass secrete key in emv file)
        expiresIn: '30d'                         //last parameter is the options
    });          
    
    user.token = token;
    return user;
}

export default router;