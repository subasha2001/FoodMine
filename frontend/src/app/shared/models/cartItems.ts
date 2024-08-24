import { inject } from "@angular/core";
import { Food } from "./food";

export class CartItem {
    //constructor gets food as the input here//
    constructor(public food:Food) {
        this.price = food.price;
    }
    quantity: number = 1;
    price: number = 0;
}
