import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../../services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  imports:[CommonModule],
  standalone: true
})
export class LoadingComponent{
  loadingImg:string = 'https://raw.githubusercontent.com/nasirjd/foodmine-course/c421e8a621db684979efb9cfdd60310623cb203d/frontend/src/assets/loading.svg';
  isLoading!: boolean;
  constructor(loadingService: LoadingService) {
    loadingService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
   }
}