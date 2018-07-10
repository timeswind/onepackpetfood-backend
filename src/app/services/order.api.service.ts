import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable()
export class OrderApiService {
    constructor(private http: HttpClient) { }
    newOrder(data: any) {
        console.log('newOrder api called')
        return this.http.post<any>(`${environment.apiUrl}/internal/order`, data)
            .pipe(map(result => {
                console.log('result', result)
                return result;
            }));
    }

    getAllOrders() {
        console.log('getAllOrders api called')
        return this.http.get<any>(`${environment.apiUrl}/internal/orders`)
        .pipe(map(result => {
            console.log('result', result)
            return result;
        }));
    }

    updateOrderInfo(orderInfoData: any) {
        console.log('updateOrderInfo api called')
        return this.http.put<any>(`${environment.apiUrl}/internal/order`, orderInfoData)
            .pipe(map(result => {
                console.log('result', result)
                return result;
            }));
    }
}