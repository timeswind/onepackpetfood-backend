import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient, private router: Router, private appState: AppState) { }

    login(email: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/public/login`, { email: email, password: password })
            .pipe(map(data => {
                console.log('data', data)
                // login successful if there's a jwt token in the response
                if (data.success) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(data));
                }

                return data;
            }));
    }

    signup(email: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/public/signup`, { email: email, password: password })
            .pipe(map(data => {
                console.log('data', data)
                // login successful if there's a jwt token in the response
                if (data.success) {
                    localStorage.setItem('currentUser', JSON.stringify(data));
                }

                return data;
            }));
    }

    getMyInfo() {
        return this.http.get<any>(`${environment.apiUrl}/protect/myinfo`)
            .pipe(map(data => {
                return data;
            }));
    }

    updateMyInfo(data: any) {
        return this.http.post<any>(`${environment.apiUrl}/protect/myinfo`, data)
            .pipe(map(data => {
                console.log('data', data)
                // login successful if there's a jwt token in the response

                return data;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        this.appState.logout();
    }
}