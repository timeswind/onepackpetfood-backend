import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable()
export class CategoryApiService {
    constructor(private http: HttpClient) { }
    newCategory(data: any) {
        console.log('newCategory api called')
        return this.http.post<any>(`${environment.apiUrl}/internal/category`, data)
            .pipe(map(result => {
                return result;
            }));
    }

    updateCategory(data: any) {
        console.log('newCategory api called')
        return this.http.put<any>(`${environment.apiUrl}/internal/category`, data)
            .pipe(map(result => {
                return result;
            }));
    }

    getRootCategories(scope: string) {
        console.log('getRootCategories api called')
        return this.http.get<any>(`${environment.apiUrl}/protect/categories?scope=${scope}`)
            .pipe(map(result => {
                return result;
            }));
    }

    getChildCategories(parent: string) {
        console.log('getChildCategories api called')
        return this.http.get<any>(`${environment.apiUrl}/protect/categories?parent=${parent}`)
            .pipe(map(result => {
                return result;
            }));
    }

    getCategoriesData(aggregate_scope: string) {
        console.log('getCategoriesData api called')
        return this.http.get<any>(`${environment.apiUrl}/protect/categories?aggregate_scope=${aggregate_scope}`)
            .pipe(map(result => {
                return result;
            }));
    }
}