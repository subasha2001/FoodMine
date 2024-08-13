import {Router} from 'express';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User, UserModel } from '../models/user.model';
import { HTTP_BAD_REQUEST } from '../constant/http_status';
import bcrypt from 'bcryptjs';

const router = Router();

router.get('/seed', asyncHandler(
    async (req, res) => {
        const foodsCount = await UserModel.countDocuments();
        if(foodsCount > 0){
            res.send("Seed is already done!")
            return;
        }

        await UserModel.create(sample_users);
        res.send("Seed is done!")
        //the connection btw db and oru code is asynchronized
    }
));
router.post('/login', asyncHandler(
    async (req, res)=>{  //we can send the body to the server
        const {email, password} = req.body   //destructuring assignment
        const user = await UserModel.findOne({email, password});
            //token - encrypted text, sent to the client and to be saved there
            //and the client should send it with each request and the server 
            //decrypt it and understand which user is doing that req
            // for authentication and authorization
        if(user){
            res.send(generateTokenResponse(user));
        }else{
            res.status(HTTP_BAD_REQUEST).send("Username or Password not valid!")
        }
    }
));
router.post('/register', asyncHandler(
    async(req,res)=>{
        const {name, email, password, address} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            res.status(HTTP_BAD_REQUEST).send('User already exist, please login!');
            return //here return means user is undefined
        }
        //we shoudn't directly save the password inside the db, we should encrypt(bcrypt) or hash it
        const encryptpassword = await bcrypt.hash(password, 10);  //10-salt(for higher security if we increase further)
        
        //now we create user based on the req body and save it inside the db
        const newUser:User = {
            id:'',
            name,
            email: email.toLowerCase(),
            password: encryptpassword,
            address,
            isAdmin: false
        }

        const dbUser = await UserModel.create(newUser);
        //after creating the user, it will return the user that is created inside the db,
        //so we will have the db id in the user
        res.send(generateTokenResponse(dbUser));
        
    }
))

//we need jwt to generate a token
const generateTokenResponse = (user:User)=>{
    const token =jwt.sign({                 //process of generating token is sign
        id: user.id, 
        email:user.email, 
        isAdmin: user.isAdmin               //first parameter is payload or what we want to encode 
    }, process.env.JWT_SECRET!, {           //second parameter is of sign fn(pass secrete key in emv file)
        expiresIn: '30d'                    //last parameter is the options
    });   
    
    return {
        id:  user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token
    };
}

export default router;