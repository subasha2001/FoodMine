import { Injectable } from '@angular/core';
import { food } from '../shared/models/food';
import { sample_foods, sample_tags } from '../../data';
import { Tag } from '../shared/models/tags';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll(): food[] {
    return sample_foods;
  }

  getAllFoodBySearchTerm(searchTerm: string) {
    return this.getAll().filter(val => val.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  getAllTags(): Tag[] {
    return sample_tags;
  }

  getAllFoodByTag(tag: string): food[] {
    return tag === 'All' ?
    this.getAll() :
    this.getAll().filter(food => food.tags?.includes(tag));
  }

  getFoodById(foodId:string):food{
    return this.getAll().find(food => food.id == foodId) ?? new food; 
  }
}
