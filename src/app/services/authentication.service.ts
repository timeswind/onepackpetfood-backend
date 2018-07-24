import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient, private router: Router) { }

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

    getCosUploadSigniture(pathname: string, method: string) {
        return this.http.get<any>(`${environment.apiUrl}/protect/tencent_cloud_bucket_upload_signiture?pathname=${pathname}&method=${method}`)
            .pipe(map(data => {
                console.log('data', data)
                // login successful if there's a jwt token in the response
                return data;
            }));
    }

    uploadFile(file: any, key: string, authdata: any): Observable<HttpEvent<{}>> {
        var Bucket = 'xiaoquanju-1257075795';
        var Region = 'ap-shanghai';
        var protocol = location.protocol === 'https:' ? 'https:' : 'http:';
        var prefix = protocol + '//' + Bucket + '.cos.' + Region + '.myqcloud.com/';
        var auth = authdata.Authorization;
        var XCosSecurityToken = authdata.XCosSecurityToken;
        var url = prefix + key;


        const req = new HttpRequest('PUT', url, file, {
            reportProgress: true,
            headers: new HttpHeaders({
                'Authorization': auth,
                'x-cos-security-token': XCosSecurityToken
            })
        });

        return this.http.request(req);
    }

    logout() {
        // remove user from local storage to log user out
        // this.appState.logout();
    }
}