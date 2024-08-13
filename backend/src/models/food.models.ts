import { model, Schema } from "mongoose";

// to create a mangoos model in ts we need to create an interface
export interface Food{
    id:string;
    name:string;
    price:number;        
    tags:string[];       
    favorite:boolean;
    stars:number;
    imageUrl:string
    origins:string[];
    cookTime:string;
}

export const FoodSchema = new Schema<Food>(
    {
        name: {type: String, required:true},
        price: {type: Number, required:true},
        tags: {type: [String]},                      //string array
        favorite: {type: Boolean, default:false},
        stars: {type: Number, required:true},
        imageUrl: {type: String, required:true},
        origins: {type: [String], required:true},
        cookTime: {type: String, required:true},
    },{
        toJSON:{
            virtuals:true 
            //if we send the values using mangoos from api to client,
            //it will call to JSON and the id's will be filled
        },
        toObject:{
            virtuals: true
            //when we get values form db and we want to work with it
        },
        //to observe when they are created and updated(another food)
        timestamps:true  //it will set the timestamp automatically(a feature of mangoos)
    }
)
//for the id to be available we need virtuals
//virtuals are values that are not saved in the data base, 
//will be generated based on the values in the db

export const FoodModel = model<Food>('food', FoodSchema)//'food' - name of the model
// now we can all create, update and delete operations to the db
