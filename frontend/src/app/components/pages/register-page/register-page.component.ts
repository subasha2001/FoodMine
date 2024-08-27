import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PasswordsMatchValidators } from '../../../shared/models/validators/password_match-validators';
import { IUserRegister } from '../../../shared/models/interfaces/iUserRegister';
import { TitleComponent } from '../../partials/title/title.component';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    TitleComponent,
    TextInputComponent,
    ReactiveFormsModule,
    DefaultButtonComponent,
    RouterLink
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit {
  registerForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '';

  constructor(
    private formBuilder: FormBuilder,   //for building the form group
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(10)]]
    },
      //we use options from the groups to check pass and confPass are same
      {   //options -> custom made validators
        validators: PasswordsMatchValidators('password', 'confirmPassword')
      });
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
    // queryparams is inside the url
  }

  get fc() {
    return this.registerForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if (this.registerForm.invalid) return;

    const fv = this.registerForm.value;
    const user: IUserRegister = {
      name: fv.name,
      email: fv.email,
      password: fv.password,
      confirmPassword: fv.confirmPassword,
      address: fv.address
    }
    this.userService.register(user).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl);
    })
  }
}
