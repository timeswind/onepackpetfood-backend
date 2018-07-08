import { Injectable } from '@angular/core';
import { userInfo } from 'os';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { Observable } from 'rxjs/Observable';

// interface User {
//     name:    string;
//     id:     string;
//     role: number;
// }

@Injectable()
export class AppState {
    constructor(private router: Router) { 
        if (localStorage.getItem('currentUser')) {
            let userInfo: any = JSON.parse(localStorage.getItem('currentUser'));
            this.email = userInfo.email;
            this.token = userInfo.token;
            this.role = userInfo.role;
            this.name.next(userInfo.name);
            this.islogin = true;
        }
 
    }
    // private _isRed = new BehaviorSubject<boolean>(false);
    // isRed: Observable<boolean> = this._isRed.asObservable();
    private _islogin:boolean = false;
    private _token:string;
    private _email:string;
    private _role:number;
    private _redirectUrl: string;
    public name = new BehaviorSubject("");

    public set redirectUrl(url : string) {
        this._redirectUrl = url;
    }
    
    public get redirectUrl() : string {
        return  this._redirectUrl;
    }
    
    public set role(role : number) {
        this._role = role;
    }

    
    public get role() : number {
        return  this._role;
    }
    
    

    set islogin(islogin:boolean) {
        this._islogin = islogin;
    }

    get islogin():boolean{
        return this._islogin;
    }

    set token(token:string) {
        this._token = token;
    }

    get token():string{
        return this._token;
    }
    
    set email(email:string) {
        this._email = email;
    }

    get email():string{
        return this._email;
    }

    public setName(name:string):void {
        this.name.next(name)
    }

    logout():void {
        console.log('reset hit')
        this._islogin = false;
        this.name.next("");
        this._token = "";
        this._email = "";
        this._role = 0;
        this._redirectUrl = "";
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }
    // setToken(token:string) {
    //     this._token.next(token);
    // }
    // getToken() {
    //     return this._token.asObservable();
    // }
    // toggleRed() {
    //     this._isRed.next(!this._isRed.value);
    // }
}