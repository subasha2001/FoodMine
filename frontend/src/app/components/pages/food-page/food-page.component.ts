import { Component, OnInit } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { PageNotFoundComponent } from '../../partials/page-not-found/page-not-found.component';
import { StarRatingComponent } from '../../partials/star-rating/star-rating.component';

@Component({
  selector: 'app-food-page',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterModule, PageNotFoundComponent, StarRatingComponent],
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.css'
})
export class FoodPageComponent implements OnInit {
  food!: Food;
  constructor(
    activatedRoute: ActivatedRoute,
    private foodservice: FoodService,
    private cartservice: CartService,
    private router: Router
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.id)
        this.foodservice.getFoodById(params.id).subscribe(serverFoods => {
          this.food = serverFoods;
        })
      //we cant directly send it to foods we have to subscribe to it
    })
  }
  ngOnInit(): void {

  }
  addToCart() {
    this.cartservice.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }
}
