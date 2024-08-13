import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userservice = inject(UserService);
  const user = userservice.currentUser;
  
  if (user.token)
  {    
    req = req.clone({
      //this creates a new object from the current object(req)
      setHeaders: {access_token: user.token}
    })
  }  
  console.log(user);
  
  return next(req);
};

// interceptor connection between server and client and sync all the req going to the server 
// show loading when we call a request and hide loading when all the req are finished