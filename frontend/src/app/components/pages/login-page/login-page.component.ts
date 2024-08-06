import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'
import { TitleComponent } from '../../partials/title/title.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr'
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    TitleComponent, 
    CommonModule, 
    ToastrModule,
    TextInputComponent,
    DefaultButtonComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit{
  loginForm!:FormGroup;
  isSubmitted:boolean = false;
  returnUrl = '';

  constructor (
    private formBuilder: FormBuilder,
    private userservice:UserService, 
    private actRouts:ActivatedRoute,
    private router:Router
  ){}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password:['',[Validators.required]]
    });

    this.returnUrl = this.actRouts.snapshot.queryParams.returnUrl
    //snapshot - the latest value of the activatedRoute
    //queryParams are the everything after the question mark
    //we get the return url each we come into the login component
  }

  get fc(){        //getter property
    return this.loginForm.controls;
  }

  submit(){    
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;

    this.userservice.login({
      email: this.fc.email.value, 
      password:this.fc.password.value}).subscribe(()=>{
        this.router.navigateByUrl(this.returnUrl);
      });
  }   //submit method responsible for login

}
