import { Component, OnInit } from '@angular/core';
import { food } from '../../../shared/models/food';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-food-page',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterModule],
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.css'
})
export class FoodPageComponent implements OnInit {
  food!: food;
  constructor(
    activatedRoute: ActivatedRoute, 
    private foodservice: FoodService, 
    private cartservice: CartService,
    private router: Router
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params['id'])
        this.food = this.foodservice.getFoodById(params['id']);
    })
  }
  ngOnInit(): void {

  }
  addToCart(){
    console.log('Clicked');
    
    this.cartservice.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }
}
