import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req, next): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem('token');

    console.log(idToken);
    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${idToken}`)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
