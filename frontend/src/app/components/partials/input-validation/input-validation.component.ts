import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MSG:any = {
  required: 'Should not be empty',
  email: 'Email is not valid',
  minLength: 'Field is too short',
  notMatch: 'Password and Confirm does not match'
}

@Component({
  selector: 'input-validation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-validation.component.html',
  styleUrl: './input-validation.component.css'
})
export class InputValidationComponent implements OnChanges,OnInit {
  ngOnInit(): void {
    this.control.statusChanges.subscribe(()=>{
      this.checkValidation();
    })
    this.control.valueChanges.subscribe(()=>{
      this.checkValidation();
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }
  // we are calling checkvalidation in all changing situation
  @Input()control!:AbstractControl;
  @Input()showErrorWhen:boolean = true;

  errorMsgs:string[] = [];

  checkValidation(){
    const errors = this.control.errors;
    if(!errors){
      this.errorMsgs = [] ;
      return
    }
    const errorKeys = Object.keys(errors);
    this.errorMsgs = errorKeys.map(key => VALIDATORS_MSG[key]);
    //if key is required = should not be empty
    //if key is email = email is not valid
  }
}
