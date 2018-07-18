import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreApiService } from '../../services/store.api.service';
import { first } from 'rxjs/operators';
@Component({
    selector: 'my_store',
    templateUrl: './my_store.component.html',
    styleUrls: ['./my_store.component.scss']
})

export class MyStoreComponent implements OnInit {
    loading = true;
    haveCreatedStore: boolean = false
    storeData: any;
    storeAccountData: any;
    storeTagtrackCode: string;
    constructor(
        private storeApiService: StoreApiService
    ) {
        var wx_state = localStorage.getItem('wx_state')
        if (wx_state) {
            this.storeTagtrackCode = wx_state
            this.getStoreInfoByTagtrackCode(wx_state);
        }
    }

    ngOnInit() {
        this.getMyStoreInfo();
        // this.getStoreInfoByTagtrackCode("SJiNtEvQQ");
    }

    // convenience getter for easy access to form fields
    private getMyStoreInfo(): void {
        this.loading = true
        this.storeApiService.getStoreOwnerStore()
            .pipe(first())
            .subscribe(
                data => {
                    if (data.success) {
                        this.haveCreatedStore = true
                        this.storeData = data.store
                        this.storeAccountData = data.storeAccount;
                    }
                    this.loading = false;
                },
                error => {
                    this.loading = false;
                });
    }

    private getStoreInfoByTagtrackCode(code: string): void {
        this.loading = true
        this.storeApiService.getStoreInfoByTagtrackCode(code)
            .pipe(first())
            .subscribe(
                data => {
                    if (data.success) {
                        this.storeData = data.store;
                    }
                    this.loading = false;
                },
                error => {
                    this.loading = false;
                });
    }

    private bindStore(code:string):void {
        this.loading = true
        this.storeApiService.bindStore(code)
        .pipe(first())
        .subscribe(
            data => {
                if (data.success) {
                    console.log(data)
                    this.haveCreatedStore = true;
                    this.storeData = data.store;
                    this.storeAccountData = data.storeAccount;
                }
                this.loading = false;
            },
            error => {
                this.loading = false;
            });
    }
}