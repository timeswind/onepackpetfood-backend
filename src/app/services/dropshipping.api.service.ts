import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable()
export class DropshippingApiService {
    constructor(private http: HttpClient) { }
    newDropshipping(data: any) {
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
}