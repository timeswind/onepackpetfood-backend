import { AuthData } from './models/auth_data.model';
import { essentialData } from './models/essential_data.model';
export interface AppState {
  readonly auth: AuthData;
  readonly essentialData: essentialData;
}

export const selectAuth = (state: AppState) => state.auth;
export const selectEssentialData = (state: AppState) => state.essentialData;

// import { Injectable } from '@angular/core';
// import { userInfo } from 'os';
// import { Router } from '@angular/router';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// // import { Observable } from 'rxjs/Observable';

// // interface User {
// //     name:    string;
// //     id:     string;
// //     role: number;
// // }

// @Injectable()
// export class AppState {
//     constructor(private router: Router) { 
//         if (localStorage.getItem('currentUser')) {
//             let userInfo: any = JSON.parse(localStorage.getItem('currentUser'));
//             this.email = userInfo.email || "";
//             this.token = userInfo.token;
//             this.role.next(userInfo.role);
//             this.avatar.next(userInfo.avatar || "");
//             this.name.next(userInfo.name);
//             this.islogin.next(true);
//         }
 
//     }
//     // private _isRed = new BehaviorSubject<boolean>(false);
//     // isRed: Observable<boolean> = this._isRed.asObservable();
//     private _token:string;
//     private _email:string;
//     private _role:number;
//     private _redirectUrl: string;
//     public name = new BehaviorSubject("");
//     public avatar = new BehaviorSubject("");
//     public role = new BehaviorSubject(0);
//     public islogin = new BehaviorSubject(false);

//     public set redirectUrl(url : string) {
//         this._redirectUrl = url;
//     }
    
//     public get redirectUrl() : string {
//         return  this._redirectUrl;
//     }
    
//     set token(token:string) {
//         this._token = token;
//     }

//     get token():string{
//         return this._token;
//     }
    
//     set email(email:string) {
//         this._email = email;
//     }

//     get email():string{
//         return this._email;
//     }

//     public setName(name:string):void {
//         this.name.next(name)
//     }

//     logout():void {
//         this.islogin.next(false);
//         this.name.next("");
//         this.avatar.next("");
//         this._token = "";
//         this._email = "";
//         this._role = 0;
//         this._redirectUrl = "";
//         localStorage.removeItem('currentUser');
//         this.router.navigate(['/login']);
//     }
//     // setToken(token:string) {
//     //     this._token.next(token);
//     // }
//     // getToken() {
//     //     return this._token.asObservable();
//     // }
//     // toggleRed() {
//     //     this._isRed.next(!this._isRed.value);
//     // }
// }