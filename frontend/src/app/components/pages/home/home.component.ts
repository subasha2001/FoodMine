import { Component } from '@angular/core';
import { food } from '../../../shared/models/food';
import { FoodService } from '../../../services/food.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SearchComponent } from '../../partials/search/search.component';
 
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SearchComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  foods:food[] = [];
  constructor(private foodService:FoodService, activatedRoute: ActivatedRoute){
    activatedRoute.params.subscribe((params)=>{
      if(params.searchTerm)
      this.foods = this.foodService.getAllFoodBySearch(params.searchTerm)
      else
      this.foods = foodService.getAll();
    })
    this.foods = foodService.getAll();
  }

}
