import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable()
export class StoreApiService {
    constructor(private http: HttpClient) { }
    newStore(data: any) {
        console.log('newStore api called')
        return this.http.post<any>(`${environment.apiUrl}/internal/store`, data)
            .pipe(map(result => {
                console.log('result', result)
                return result;
            }));
    }

    getAllStore() {
        console.log('getAllStore api called')
        return this.http.get<any>(`${environment.apiUrl}/internal/stores`)
        .pipe(map(result => {
            console.log('result', result)
            return result;
        }));
    }

    // newTagtrack(data: any) {
    //     console.log('newTagtrace api called')
    //     return this.http.post<any>(`${environment.apiUrl}/internal/tagtrack`, data)
    //         .pipe(map(result => {
    //             console.log('result', result)
    //             return result;
    //         }));
    // }

    updateStoreInfo(storeInfoData: any) {
        console.log('updateStoreInfo api called')
        return this.http.put<any>(`${environment.apiUrl}/internal/store`, storeInfoData)
            .pipe(map(result => {
                console.log('result', result)
                return result;
            }));
    }

    // getAllTagrack() {
    //     return this.http.get<any>(`${environment.apiUrl}/internal/tagtracks`)
    //     .pipe(map(result => {
    //         console.log('result', result)
    //         return result;
    //     }));
    // }

    // getAllInactiveTagrackOfStore() {
    //     return this.http.get<any>(`${environment.apiUrl}/internal/inactive_store_tagtrack_list`)
    //     .pipe(map(result => {
    //         console.log('result', result)
    //         return result;
    //     }));
    // }
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