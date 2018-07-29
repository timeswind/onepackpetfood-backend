import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Dropshipping } from '../models/dropshipping.model'
@Injectable()
export class DropshippingApiService {
    constructor(private http: HttpClient) { }

    delete(id: string) {
        console.log('DropshippingApiService delete api called')
        return this.http.delete<any>(`${environment.apiUrl}/internal/dropshipping?id=${id}`)
            .pipe(map(result => {
                return result;
            }));
    }


    newDropshipping(data: Dropshipping) {
        console.log('newDropshipping api called')
        return this.http.post<any>(`${environment.apiUrl}/internal/dropshipping`, data)
            .pipe(map(result => {
                return result;
            }));
    }

    updateDropshipping(data: any) {
        console.log('updateDropshipping api called')
        return this.http.put<any>(`${environment.apiUrl}/internal/dropshipping`, data)
            .pipe(map(result => {
                return result;
            }));
    }

    getAllDropshippings() {
        console.log('getAllDropshippings api called')
        return this.http.get<any>(`${environment.apiUrl}/internal/dropshippings`)
            .pipe(map(result => {
                return result;
            }));
    }

    addToGood(dropshipping_id: string) {
        console.log('addToGood api called')
        return this.http.post<any>(`${environment.apiUrl}/internal/dropshipping/add-to-good`, { id: dropshipping_id })
            .pipe(map(result => {
                return result;
            }));
    }
}