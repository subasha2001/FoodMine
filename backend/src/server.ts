import express from "express"
import cors from "cors"  //we use cors to run backend in different port(localhost:5000)
import { sample_foods, sample_tags } from "./data";

  // nodemon automaticall use ts-node if we give it a ts file //

const app = express();  //we are going to define all apis using this application
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
app.get('/api/foods/tags/:tagName', (req, res) =>{
    const tagName = req.params.tagName;
    const foods = sample_foods.filter(val => val.tags?.includes(tagName));
    res.send(foods);
})
app.get('/api/foods/:foodId', (req,res)=>{
    const foodId = req.params.foodId;
    const food = sample_foods.find(food => food.id == foodId);
    res.send(food);
})


const port = 5000;
app.listen(port, ()=>{       //function works when the listening is completed
    console.log("Website server on http://localhost:" + port);
})