import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MAT_BOTTOM_SHEET_DATA, MatTableDataSource, MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { TagtraceApiService } from '../../services/tagtrace.api.service';
import { StoreApiService } from '../../services/store.api.service';
import { first, filter } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'store_management',
    templateUrl: './store.management.component.html',
    styleUrls: ['./store.management.component.scss']
})

export class StoreManagementComponent {
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
                });
    }
    openDialog(): void {
        const dialogRef = this.dialog.open(AddNewStoreDialog, {
            width: '250px',
            data: {}
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
        this.tagtraceApiService.getAllInactiveTagrackOfStore()
            .pipe(first())
            .subscribe(
                data => {
                    console.log(data)
                    this.inactive_tagtracks = data.records
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
    has_binded_owner = false;
    qrcode_data: string;
    storeInfoData: any;
    constructor(private notificationService: NotificationService,
        private bottomSheetRef: MatBottomSheetRef<StoreInfoBottomSheet>,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private storeApiService: StoreApiService) {
        this.storeInfoData = data
        if ("owner_user" in data && data["owner_user"]) {
            this.has_binded_owner = true
        }
        this.qrcode_data = `http://${environment.domain}/api/public/bind_store?tagtrack=${data.tagtrack_code}`
    }

    updateStoreInfo(): void {
        this.storeApiService.updateStoreInfo(this.storeInfoData)
            .pipe(first())
            .subscribe(
                data => {
                    console.log(data)
                    this.bottomSheetRef.dismiss();
                    this.notificationService.subj_notification.next("更新成功")
                },
                error => {
                    this.notificationService.subj_notification.next("更新失败")
                });
    }
}