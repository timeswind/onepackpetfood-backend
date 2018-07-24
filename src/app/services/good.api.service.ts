import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable()
export class GoodApiService {
    constructor(private http: HttpClient) { }
    newGood(data: any) {
        console.log('newGood api called')
        return this.http.post<any>(`${environment.apiUrl}/protect/good`, data)
            .pipe(map(result => {
                return result;
            }));
    }

    getStoreGoods() {
        console.log('getStoreGoods api called')
        return this.http.get<any>(`${environment.apiUrl}/protect/goods`)
            .pipe(map(result => {
                return result;
            }));
    }

    updateGood(data: any) {
        console.log('updateGood api called')
        return this.http.put<any>(`${environment.apiUrl}/protect/good`, data)
            .pipe(map(result => {
                return result;
            }));
    }
}