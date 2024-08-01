import { Component, OnInit } from '@angular/core';
import { food } from '../../../shared/models/food';
import { FoodService } from '../../../services/food.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SearchComponent } from '../../partials/search/search.component';
import { TagsComponent } from '../../partials/tags/tags.component';

 
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SearchComponent,
    TagsComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  foods:food[] = [];
  constructor(private foodService:FoodService, private activatedRoute: ActivatedRoute){      //activated -- to listen to the routes
    activatedRoute.params.subscribe((params)=>{       //params changes calls the fn in subscribe
      if(params['searchTerm'])          //already has a searchTerm property
      this.foods = this.foodService.getAllFoodBySearchTerm(params['searchTerm']);
      else if(params['tag'])
      this.foods = this.foodService.getAllFoodByTag(params['tag']);
      else
      this.foods = this.foodService.getAll();
    })
  }

  ngOnInit(): void {
    
  }

}
