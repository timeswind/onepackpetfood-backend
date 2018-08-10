import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  Route
} from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { AuthData } from './../models/auth_data.model';
import { AppState, selectAuth } from './../app.state';
import { selectAuthIsLogin } from '../reducers/auth.reducer';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(
    private router: Router,
    private store: Store<AppState>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let url: string = state.url;
    return this.store.pipe(
      select(selectAuthIsLogin),
      map(authed => {
        if (!authed) {
          this.router.navigate(['/login']);

          // this.store.dispatch(new AuthActions.LoginRedirect());
          return false;
        }

        return true;
      }),
      take(1)
    );
  }

  // checkLogin(url: string): Observable<boolean> {


  // this.store.pipe
  // // if (this.appState.islogin) { return true; }

  // // // Store the attempted URL for redirecting
  // // this.appState.redirectUrl = url;

  // // Navigate to the login page with extras
  // this.router.navigate(['/login']);
  // return false;
  // }
}

@Injectable()
export class AdminAuthGuard implements CanLoad, CanActivate {

  constructor(
    private router: Router,
    private store: Store<AppState>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let url: string = state.url;
    return this.checkPermission(url);

  }

  canLoad(route: Route): Observable<boolean> {
    let url = `/${route.path}`;
    return this.checkPermission(url);
  }

  checkPermission(url: string): Observable<boolean> {
    return this.store.pipe(
      select(selectAuth),
      map(auth => {
        if (auth.isLogin && auth.role === 100) {
          return true;
        }
        this.router.navigate(['/login']);
        return false;
      }),
      take(1)
    );
  }
}

@Injectable()
export class AlreadyLoginAuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return true
  }

  // checkLogin(url: string): boolean {
  //   if (this.appState.islogin) {
  //     this.router.navigate(['/tagtrace']);
  //     return false;
  //   } else {
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  // }
}

@Injectable()
export class isLoginAuthGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router,
    private store: Store<AppState>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let url: string = state.url;
    return this.checkPermission(url);

  }

  canLoad(route: Route): Observable<boolean> {
    let url = `/${route.path}`;
    return this.checkPermission(url);
  }

  checkPermission(url: string): Observable<boolean> {
    return this.store.pipe(
      select(selectAuth),
      map(auth => {
        if (auth.isLogin) {
          return true;
        }
        this.router.navigate(['/login']);
        return false;
      }),
      take(1)
    );
  }
}