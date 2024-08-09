import { Component } from '@angular/core';
import { LoadingService } from '../../../services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
isLoading!:boolean;
loadingImg:string = 'https://raw.githubusercontent.com/nasirjd/foodmine-course/c421e8a621db684979efb9cfdd60310623cb203d/frontend/src/assets/loading.svg'
constructor(private loadservice:LoadingService){
  loadservice.isLoading.subscribe((isloading)=>{
    this.isLoading = isloading;  //by this it will be always synced with loading service
  })
}
}
//interceptor - staying btw server and client async all the req that goes to the server