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

    updateStoreInfo(storeInfoData: any) {
        console.log('updateStoreInfo api called')
        return this.http.put<any>(`${environment.apiUrl}/internal/store`, storeInfoData)
            .pipe(map(result => {
                console.log('result', result)
                return result;
            }));
    }

    getStoreOwnerStore() {
        console.log('updateStoreInfo api called')
        return this.http.get<any>(`${environment.apiUrl}/protect/my_store`)
            .pipe(map(result => {
                console.log('result', result)
                return result;
            }));
    }

    getStoreInfoByTagtrackCode(tagtrack_code: string) {
        console.log('getStoreInfoByTagtrackCode api called')
        return this.http.get<any>(`${environment.apiUrl}/protect/store_by_tagtrack?tagtrack=${tagtrack_code}`)
            .pipe(map(result => {
                return result;
            }));
    }

    bindStore(tagtrack_code: string) {
        console.log('bindStore api called')
        return this.http.post<any>(`${environment.apiUrl}/protect/bind_store`, { tagtrack_code: tagtrack_code })
            .pipe(map(result => {
                return result;
            }));
    }
}