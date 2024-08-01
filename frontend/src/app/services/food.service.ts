import { Injectable } from '@angular/core';
import { food } from '../shared/models/food';
import { sample_foods } from '../../data';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll():food[]{
    return sample_foods;
  }

  getAllFoodBySearch(searchTerm:string){
    return this.getAll().filter(val => val.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
}
