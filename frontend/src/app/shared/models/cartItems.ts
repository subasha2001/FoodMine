import { food } from "./food";

export class CartItem{
    food!:food;
    constructor(food:food){}
    quantity: number = 1;
    price: number = this.food.price;
}