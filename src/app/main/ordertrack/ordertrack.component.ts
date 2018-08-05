import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MAT_BOTTOM_SHEET_DATA, MatTableDataSource, MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { first, filter } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { OrderApiService } from '../../services/order.api.service';


@Component({
    selector: 'ordertrack',
    templateUrl: './ordertrack.component.html',
    styleUrls: ['./ordertrack.component.scss']
})

export class OrdertrackComponent {
    dataSource: any;
    constructor(public dialog: MatDialog,
        private orderApiService: OrderApiService,
        private router: Router,
        private bottomSheet: MatBottomSheet) {
    }

    ngOnInit(): void {
        this.fetchOrders();
    }
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    fetchOrders(): void {
        this.orderApiService.getAllOrders()
            .pipe(first())
            .subscribe(
                data => {
                    console.log(data)
                    this.dataSource = new MatTableDataSource(data.orders);
                },
                error => {
                    // this.loading = false;
                });
    }
    openDialog(): void {
        const dialogRef = this.dialog.open(OrderDetailDialog, {
            width: '800px',
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

    rowClick(row: any): void {
        const dialogRef = this.dialog.open(OrderDetailDialog, {
            width: '250px',
            data: {
                order_id: row._id
            }
        });
    }

    displayedColumns: string[] = ['sku', 'status', 'address', 'total_fee'];
}

@Component({
    selector: 'order-detail-dialog',
    templateUrl: 'order-detail-dialog.html',
    styleUrls: ['./ordertrack.component.scss']
})
export class OrderDetailDialog {
    order: any;
    constructor(
        public dialogRef: MatDialogRef<OrderDetailDialog>,
        private orderApiService: OrderApiService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        console.log(this.data)
        this.orderApiService.getOrderDetail(this.data.order_id)
            .pipe(first())
            .subscribe(
                data => {
                    this.order = data
                });
    }


    onNoClick(): void {
        this.dialogRef.close();
    }

}


// @Component({
//     selector: 'order.info.bottom.sheet',
//     templateUrl: 'order.info.bottom.sheet.html',
//     styleUrls: ['./ordertrack.component.scss']
// })
// export class OrderInfoBottomSheet {
//     constructor(private notificationService: NotificationService,
//         private bottomSheetRef: MatBottomSheetRef<OrderInfoBottomSheet>,
//         @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
//     }
// }