import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Cart } from '../../../shared/models/cart';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../shared/models/cartItems';
import { TitleComponent } from '../../partials/title/title.component';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from '../../partials/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [RouterLink, RouterModule, TitleComponent, CommonModule, PageNotFoundComponent, HttpClientModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {
  cart!: Cart;
  constructor(private cartservice: CartService) {
    cartservice.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
  }
  ngOnInit(): void {

  }

  removeFromCart(cartItem:CartItem){        
    this.cartservice.removeFromCart(cartItem.food.id);
  }

  changeQuantity(cartItem:CartItem, quantityInString:string){
    const quantity = parseInt(quantityInString);       //converting string into number
    this.cartservice.changeQuanity(cartItem.food.id, quantity);
  }
}
