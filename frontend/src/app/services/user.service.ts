import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/user';
import { IUserLogin } from '../shared/models/interfaces/iUserLogin';
import { HttpClient } from '@angular/common/http';
import { USERS_LOGIN_URL, USERS_REGISTER_URL } from '../shared/models/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/models/interfaces/iUserRegister';

const USER_KEY = 'User'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  //to expost the user data to the outside to the service
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage()); //we have to expose the user subject ouside the service
  public userObservable: Observable<User>;
  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
    //userObservable is the read only mode of userSubject, which will expose it outside
  }

  public get currentUser(): User {
    return this.userSubject.value
  }

  login(userLogin: IUserLogin): Observable<User> {
    //using interface we cannot create a new object
    //but with a class we can create a new object
    return this.http.post<User>(USERS_LOGIN_URL, userLogin).pipe(
      tap({            //used to perform side effects for notification
        next: (user) => { //success notification
          this.setUserToLocalStorage(user)
          this.userSubject.next(user);
          this.toastr.success(
            `Welcome to FoodMine ${user.name}!`,
            'Login Successful'
          )
        },
        error: (errorResponse) => { //failed notification
          this.toastr.error(errorResponse.error, 'Login Failed')
        }
      })
    )
  }

  register(userRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(USERS_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastr.success(
            `Welcome to the FoodMine ${user.name}!`,
            `Registration Successful`
          )
        },
        error: (errorResponse) => {
          this.toastr.error(errorResponse.error, 'Registration Failed!')
        }
      })
    )
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY)  //json representation of our object
    if (userJson) return JSON.parse(userJson) as User
    return new User()
    //we parse this json and convert it into user object - userJson should be present
  }
}
