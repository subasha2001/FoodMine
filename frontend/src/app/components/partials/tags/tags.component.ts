import { Component, OnInit } from '@angular/core';
import { Tag } from '../../../shared/models/tags';
import { FoodService } from '../../../services/food.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent implements OnInit {
  tags?:Tag[];
  constructor(private foodservice:FoodService){
    foodservice.getAllTags().subscribe((serverTags)=>{
      this.tags = serverTags;
    })
  }
  ngOnInit(): void {
    
  }
}