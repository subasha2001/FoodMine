import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  cartQuantity = 0;
  user!:User;

  constructor(cartservice:CartService, private userService:UserService){
    cartservice.getCartObservable().subscribe((newCart =>{
      this.cartQuantity = newCart.totalCount; 
    }))
    this.userService.userObservable.subscribe((newUser)=>{
      this.user = newUser;
    })
  }

  logout(){
    this.userService.logout;
  }
  get isAuth(){
    return this.user.name;
  }
}
