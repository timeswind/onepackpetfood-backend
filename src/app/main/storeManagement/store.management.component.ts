import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MAT_BOTTOM_SHEET_DATA, MatTableDataSource, MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { TagtraceApiService } from '../../services/tagtrace.api.service';
import { StoreApiService } from '../../services/store.api.service';
import { first, filter } from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
// export interface StoreInfoScheme {
//     name: string;
//     code: string;
//     type: string;
//     packageCode: string;
//     active: boolean;
//     active_date: Date;
//     created_at: Date;
//     _id: string;
// }

// import { locale as english } from './i18n/en';
// import { locale as turkish } from './i18n/tr';

@Component({
    selector: 'store_management',
    templateUrl: './store.management.component.html',
    styleUrls: ['./store.management.component.scss']
})

export class StoreManagementComponent {
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    // constructor(
    //     private _fuseTranslationLoaderService: FuseTranslationLoaderService
    // )
    // {
    //     this._fuseTranslationLoaderService.loadTranslations(english, turkish);
    // }
    dataSource: any;
    constructor(public dialog: MatDialog,
        private tagTraceApiService: TagtraceApiService,
        private storeApiService: StoreApiService,
        private router: Router,
        private bottomSheet: MatBottomSheet) {
    }

    ngOnInit(): void {
        this.fetchStores();
    }
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    rowClick(row: any): void {
        this.bottomSheet.open(StoreInfoBottomSheet, { data: row });
    }

    fetchStores(): void {
        this.storeApiService.getAllStore()
            .pipe(first())
            .subscribe(
                data => {
                    console.log(data)
                    this.dataSource = new MatTableDataSource(data.records);
                },
                error => {
                    // this.loading = false;
                });
    }
    openDialog(): void {
        const dialogRef = this.dialog.open(AddNewStoreDialog, {
            width: '250px',
            data: { }
        });

        dialogRef.afterClosed().subscribe(result => {
            // console.log('The dialog was closed', result);
            if (result) {
                console.log(result)
                this.storeApiService.newStore(result)
                .pipe(first())
                .subscribe(
                    data => {
                        // console.log(data)
                        this.fetchStores();
                    },
                    error => {
                        // this.loading = false;
                    });
            }
        });
    }

    displayedColumns: string[] = ['tagtrack_code', 'name', 'owner_name', 'phone'];
}

export interface NewStoreInfoScheme {
    name: string;
    address: string;
    phone: string;
    owner_name: string;
    tagtrack_code: string;
    note: string;
}


@Component({
    selector: 'new.store.dialog',
    templateUrl: 'new.store.dialog.html',
    styleUrls: ['./store.management.component.scss']
})
export class AddNewStoreDialog {
    inactive_tagtracks: any;
    newStore = new FormControl();
    constructor(
        public dialogRef: MatDialogRef<AddNewStoreDialog>,
        private tagtraceApiService: TagtraceApiService,
        @Inject(MAT_DIALOG_DATA) public data: NewStoreInfoScheme
    ) {
        console.log(this.data)
        this.tagtraceApiService.getAllInactiveTagrackOfStore()
            .pipe(first())
            .subscribe(
                data => {
                    console.log(data)
                    this.inactive_tagtracks = data.records
                },
                error => {
                    // this.loading = false;
                });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}


@Component({
    selector: 'store.info.bottom.sheet',
    templateUrl: 'store.info.bottom.sheet.html',
    styleUrls: ['./store.management.component.scss']
})
export class StoreInfoBottomSheet {
    storeInfoData: any;
    constructor(private notificationService:NotificationService,
        private bottomSheetRef: MatBottomSheetRef<StoreInfoBottomSheet>,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private storeApiService: StoreApiService) {
        this.storeInfoData = data
    }

    updateStoreInfo(): void {
        this.storeApiService.updateStoreInfo(this.storeInfoData)
            .pipe(first())
            .subscribe(
                data => {
                    console.log(data)
                    this.bottomSheetRef.dismiss();
                    // this.fetchTagtracks();
                    this.notificationService.subj_notification.next("更新成功")
                },
                error => {
                    // this.loading = false;
                    this.notificationService.subj_notification.next("更新失败")
                });
    }
}