// responsible for checking the authentucation of the user
//it is a function which gets req, res and next

import { verify } from "jsonwebtoken";
import { HTTP_UNAUTHORIZED } from "../constant/http_status";

export default (req:any, res:any, next:any)=>{
    const token = req.headers.access_token as string;  //we set it as an interceptor on the client site

    if(!token) return res.status(HTTP_UNAUTHORIZED).send();
    

    // verify method of jwt there was an exception when unauthorized so we put it in try catch

    try{
        const decodedUser = verify(token, process.env.JWT_SECRET!);  
        //prp.env.sec! - 100% not undefined and not null
        //verify method verifies the token and returns the token value
        //if we expose jwt secrete, people can decode your token and can generate another new token
        req.user = decodedUser;
    }catch (error){        
        res.status(HTTP_UNAUTHORIZED).send();
    }

    return next();
}