import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler):any{
      let currentUser: any = localStorage.getItem('userInfo');
      if (currentUser) {
        currentUser = JSON.parse(localStorage.getItem('userInfo') || '');
        httpRequest = httpRequest.clone({
          setHeaders: { Authorization: `bearer ${currentUser.token}` },
        });
      }
      return next.handle(httpRequest).pipe(
        catchError((error:any) => {
          if (error?.status === 401) {
            localStorage.removeItem('userInfo');
            this.router.navigate(['login']);
          } 
          return throwError(error);
        })
      );    
  }
}
