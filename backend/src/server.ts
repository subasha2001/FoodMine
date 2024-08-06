import express from "express"
import cors from "cors"  //we use cors to run backend in different port(localhost:5000)
import { sample_foods, sample_tags, sample_users } from "./data";
import jwt from "jsonwebtoken";

  // nodemon automaticall use ts-node if we give it a ts file //

const app = express();  //we are going to define all apis using this application
app.use(express.json());//express doesnt support json, so we should enable it
app.use(cors({          //express says cors to have a req on this server and credentials true
    credentials:true,
    origin:["http://localhost:4200"]
}));


app.get('/api/foods', (req, res) =>{
    res.send(sample_foods)
})
app.get('/api/foods/search/:searchTerm', (req, res) =>{
    const searchTerm = req.params.searchTerm;
    const foods = sample_foods.filter(val => val.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(foods)
})
app.get('/api/foods/tags', (req, res) =>{
    res.send(sample_tags);
})
app.get('/api/foods/tag/:tagName', (req, res) =>{
    const tagName = req.params.tagName;
    const foods = sample_foods.filter(val => val.tags?.includes(tagName));
    res.send(foods);
})
app.get('/api/foods/:foodId', (req,res)=>{
    const foodId = req.params.foodId;
    const food = sample_foods.find(food => food.id == foodId);
    res.send(food);
})

app.post('/api/users/login', (req, res)=>{  //we can send the body to the server
    const {email, password} = req.body
    const user = sample_users.find(user => user.email === email && user.password === password)

    if(user){
        res.send(generateTokenResponse(user));
    }else{
        res.status(400).send("Username of Password not valid")
    }
})     

const generateTokenResponse = (user:any)=>{
    const token = jwt.sign({                     //process of generating token is sign
        email:user.email, isAdmin: user.isAdmin  //first parameter is payload or what we want to encode 
    }, "SomeRandomText", {                       //second parameter is of sign fn(pass secrete key in emv file)
        expiresIn: '30d'                         //last parameter is the options
    });          
    
    user.token = token;
    return user;
}

const port = 5000;

app.listen(port, ()=>{       //function works when the listening is completed
    console.log("Website server on http://localhost:" + port);
})