import { CartItem } from "./cartItems";

export class Cart{
    items:CartItem[]= [];
    //we use new keywword ,a new instance of the array is created
    totalPrice:number = 0;
    totalCount:number = 0;
}