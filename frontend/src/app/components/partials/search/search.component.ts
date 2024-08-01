import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchTerm = ''
  constructor(activatedRouter:ActivatedRoute, private router: Router){
    activatedRouter.params.subscribe((params)=>{
      if(params.searchTerm) this.searchTerm = params.searchTerm;
    });
  }
  search(term:string):void{
    this.router.navigateByUrl('/search' + term);
  }
}
