import { Food } from "./food";

export class CartItem {
    //constructor gets food as the input here//
    constructor(public food: Food) {
    }
    quantity: number = 1;
}