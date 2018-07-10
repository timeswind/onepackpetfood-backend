import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MAT_BOTTOM_SHEET_DATA, MatTableDataSource, MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { TagtraceApiService } from '../../services/tagtrace.api.service';
// import { StoreApiService } from '../../services/store.api.service';
import { first, filter } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
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
    selector: 'ordertrack',
    templateUrl: './ordertrack.component.html',
    styleUrls: ['./ordertrack.component.scss']
})

export class OrdertrackComponent {
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
        this.bottomSheet.open(OrderInfoBottomSheet, { data: row });
    }

    fetchStores(): void {
        // this.storeApiService.getAllStore()
        //     .pipe(first())
        //     .subscribe(
        //         data => {
        //             console.log(data)
        //             this.dataSource = new MatTableDataSource(data.records);
        //         },
        //         error => {
        //             // this.loading = false;
        //         });
    }
    openDialog(): void {
        const dialogRef = this.dialog.open(AddNewOrderDialog, {
            width: '250px',
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            // console.log('The dialog was closed', result);
            // if (result) {
            //     console.log(result)
            //     this.storeApiService.newStore(result)
            //     .pipe(first())
            //     .subscribe(
            //         data => {
            //             // console.log(data)
            //             this.fetchStores();
            //         },
            //         error => {
            //             // this.loading = false;
            //         });
            // }
        });
    }

    displayedColumns: string[] = ['_id', 'item_name', 'count', 'address'];
}

export interface NewOrderInfoScheme {
    _id: String;
    item_name: String;
    count: Number;
    address: String;
}


@Component({
    selector: 'new.order.dialog',
    templateUrl: 'new.order.dialog.html',
    styleUrls: ['./ordertrack.component.scss']
})
export class AddNewOrderDialog {
    inactive_tagtracks: any;
    newStore = new FormControl();
    constructor(
        public dialogRef: MatDialogRef<AddNewOrderDialog>,
        private tagtraceApiService: TagtraceApiService,
        @Inject(MAT_DIALOG_DATA) public data: NewOrderInfoScheme
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
    selector: 'order.info.bottom.sheet',
    templateUrl: 'order.info.bottom.sheet.html',
    styleUrls: ['./ordertrack.component.scss']
})
export class OrderInfoBottomSheet {
    storeInfoData: any;
    constructor(private notificationService: NotificationService,
        private bottomSheetRef: MatBottomSheetRef<OrderInfoBottomSheet>,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
        this.storeInfoData = data
    }

    updateStoreInfo(): void {
        // this.storeApiService.updateStoreInfo(this.storeInfoData)
        //     .pipe(first())
        //     .subscribe(
        //         data => {
        //             console.log(data)
        //             this.bottomSheetRef.dismiss();
        //             // this.fetchTagtracks();
        //             this.notificationService.subj_notification.next("更新成功")
        //         },
        //         error => {
        //             // this.loading = false;
        //             this.notificationService.subj_notification.next("更新失败")
        //         });
    }
}