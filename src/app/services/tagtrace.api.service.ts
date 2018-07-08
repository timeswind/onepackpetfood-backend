import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable()
export class TagtraceApiService {
    constructor(private http: HttpClient) { }

    newTagtrack(data: any) {
        console.log('newTagtrace api called')
        return this.http.post<any>(`${environment.apiUrl}/internal/tagtrack`, data)
            .pipe(map(result => {
                console.log('result', result)
                return result;
            }));
    }

    updateTagtrack(tagtrackData: any) {
        console.log('updateTagtrack api called')
        return this.http.put<any>(`${environment.apiUrl}/internal/tagtrack`, tagtrackData)
            .pipe(map(result => {
                console.log('result', result)
                return result;
            }));
    }

    getAllTagrack() {
        return this.http.get<any>(`${environment.apiUrl}/internal/tagtracks`)
        .pipe(map(result => {
            console.log('result', result)
            return result;
        }));
    }

    getAllInactiveTagrackOfStore() {
        return this.http.get<any>(`${environment.apiUrl}/internal/inactive_store_tagtrack_list`)
        .pipe(map(result => {
            console.log('result', result)
            return result;
        }));
    }
    // login(email: string, password: string) {
    //     console.log(environment)
    //     return this.http.post<any>(`${environment.apiUrl}/public/login`, { email: email, password: password })
    //         .pipe(map(data => {
    //             console.log('data', data)
    //             // login successful if there's a jwt token in the response
    //             if (data.success) {
    //                 // store user details and jwt token in local storage to keep user logged in between page refreshes
    //                 localStorage.setItem('currentUser', JSON.stringify(data));
    //             }

    //             return data;
    //         }));
    // }

}