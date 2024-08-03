import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  searchTerm = '';

  //private - accessible throught the class, no access specifier - accessible only in constructor
  constructor(activatedRouter:ActivatedRoute, private router: Router){
    //we read the data from route and display in search box
    activatedRouter.params.subscribe((params)=>{
      if(params.searchTerm)
      this.searchTerm = params.searchTerm;
    });
  }
  ngOnInit(): void {
    
  }
  search(term:string):void{
    if(term)
    this.router.navigateByUrl('/search/' + term);
  }
}
