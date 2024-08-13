import { Component, OnInit } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { FoodService } from '../../../services/food.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SearchComponent } from '../../partials/search/search.component';
import { TagsComponent } from '../../partials/tags/tags.component';
import { PageNotFoundComponent } from '../../partials/page-not-found/page-not-found.component';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SearchComponent,
    TagsComponent,
    RouterLink,
    PageNotFoundComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  foods: Food[] = [];
  constructor(private foodService: FoodService, private activatedRoute: ActivatedRoute) {      
    //activated -- to listen to the routes
    let foodsObservable: Observable<Food[]>;
    activatedRoute.params.subscribe((params) => {       //params changes calls the fn in subscribe
      let foodsObservable: Observable<Food[]>;          //to get observables of these values - line 32,34,36
      if (params.searchTerm)                            //already has a searchTerm property
        foodsObservable = this.foodService.getAllFoodBySearchTerm(params.searchTerm);
      else if (params.tag)
        foodsObservable = this.foodService.getAllFoodByTag(params.tag);
      else
        foodsObservable = this.foodService.getAll();
      //we are setting the results of these in the foodsObservable
      foodsObservable.subscribe((serverFoods)=>{
        this.foods = serverFoods;
      })
    })
  }

  ngOnInit(): void {

  }

}