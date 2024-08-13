import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../shared/models/food';
import { CartItem } from '../shared/models/cartItems';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Cart = this.getCartFromLocalStorage();
  // when we refresh the page the cart will be removed so we use local storage, 
  //we get data from storage, either with details or new empty

  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() { }

  addToCart(food: Food):void {
    let cartItem = this.cart.items
      .find(item => item.food.id == food.id);
    if (cartItem) 
      return;                          //if this food is already present we stop this process here 

    this.cart.items.push(new CartItem(food));      //otherwish continue
    this.setCartToLocalStorage();
  }

  removeFromCart(foodId: string):void {
    this.cart.items = this.cart.items.filter(item => item.food.id!= foodId);
    this.setCartToLocalStorage();
  }

  changeQuanity(foodId: string, quantity: number) {
    let cartItem = this.cart.items
      .find(item => item.food.id === foodId);
    if (!cartItem) return;    //if this food is not here, we stop this process here

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartToLocalStorage();
  }

  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
    //we use observables bcoz we can change the value of subject outside the service
  }
  getCart(): Cart{
    return this.cartSubject.value;
    //subject always keeps the latest values
  }

  //getting and setting cart to the local storage

  private setCartToLocalStorage(): void {

    this.cart.totalPrice = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.food.price, 0);

    this.cart.totalCount = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    //reduce method calls the fn based on the no of items we have in items(called as many times)
    //0(prevSum) + 100(currentitem.price) = 100 this value will be added to the localstg for next item
    //100(prevSum) + 100(currentitem.price) = 200

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);  //if we are storing then we are also changing the cart
    //total price will b stored

    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
    //parse - to convert it to cartJson object else convert it to new Cart()
    // : - otherwise,  ? - is present
  }
}
