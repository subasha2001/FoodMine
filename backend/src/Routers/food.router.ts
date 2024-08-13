import { Router } from "express";
import { sample_foods, sample_tags } from "../data";
import asyncHandler from "express-async-handler";
import { FoodModel } from "../models/food.models";
// we are not going to use express, instead express-router
const router = Router() //this is the express-router , which is similar to the app.


router.get('/seed', asyncHandler(
    async (req, res) => {
        const foodsCount = await FoodModel.countDocuments();
        if (foodsCount > 0) {
            res.send("Seed is already done!")
            return;
        }

        await FoodModel.create(sample_foods);
        res.send("Seed is done!")
        //the connection btw db and oru code is asynchronized
    }
));


router.get('/', asyncHandler(
    async (req, res) => {
        const foods = await FoodModel.find();
        //find without parameters is all the values
        res.send(foods);
    }
));

router.get('/search/:searchTerm', asyncHandler(
    async (req, res) => {
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        //i - makes the searchTerm case insensitive(instead of toLowerCase())
        const foods = await FoodModel.find({ name: { $regex: searchRegex } })
        // $regex - regularexpression operator
        res.send(foods);
    }
));

router.get('/tags', asyncHandler(
    async (req, res) => {
        const tags = await FoodModel.aggregate([
            {
                $unwind: '$tags'  //combines the tags and creates one, used to find the foods
            },
            {
                $group: {
                    _id: '$tags',
                    count: { $sum: 1 }  //each tag will have sum value of 1(act new item to count)
                }
            },
            {
                $project: {       //this will give the name and count of all the tags
                    _id: 0,       //it doesnt have an id
                    name: '$_id', //it comes from group _id - tags name
                    count: '$count'
                }
            }
        ]).sort({ count: -1 })  //we have to sort it based on the count field used above
        // -1 : from highest count to lowest count
        const all = {
            name: 'All',
            count: await FoodModel.countDocuments()  //here count will be six
        }
        tags.unshift(all);  //adds to the beginning
        res.send(tags);
    }
));

router.get('/tag/:tagName', asyncHandler(
    async (req, res) => {
        const foods = await FoodModel.find({tags:req.params.tagName})
        res.send(foods);
    }
));

router.get('/:foodId', asyncHandler(
    async (req, res) => {
        const food = await FoodModel.findById(req.params.foodId)
        res.send(food);
    }
));


export default router;