import { Food } from "./food";

export class CartItem {
    //constructor gets food as the input here//
    constructor(public foodd: Food) {
        this.food = foodd;
    }
    food!:Food;
    quantity: number = 1;
    price: number = this.food?.price;
}
