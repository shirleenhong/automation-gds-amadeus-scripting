import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req, next): Observable<HttpEvent<any>> {
    let idToken = null;

    if (req.url.indexAt('remarks-manager') > -1) {
      idToken = localStorage.getItem('token_rms');
    } else {
      idToken = localStorage.getItem('token');
    }

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
