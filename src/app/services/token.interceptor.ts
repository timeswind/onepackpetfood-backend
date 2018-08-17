import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { selectAuthToken } from '../reducers/auth.reducer';
import { Store, select } from '@ngrx/store';
import { AppState } from '../app.state';
import 'rxjs/add/operator/do';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token: string;
  constructor(private store: Store<AppState>) {
    this.observeTokenChange()
  }

  private observeTokenChange(): void {
    this.store.pipe(select(selectAuthToken)).subscribe(token => {
      this.token = token
    })
  }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.headers.has("Authorization")) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`
        }
      });
    }

    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          localStorage.clear()
          location.reload()
        }
      }
    });
  }
}