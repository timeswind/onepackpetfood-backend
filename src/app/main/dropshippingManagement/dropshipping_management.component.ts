import { Component, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MAT_BOTTOM_SHEET_DATA, MatTableDataSource, MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { DropshippingApiService } from '../../services/dropshipping.api.service';
import { first } from 'rxjs/operators';
import { NotificationService } from '../../services/notification.service';
// import { environment } from '../../../environments/environment';
import { IMAGE_CDN_URL, GOOD_IMAGE_SMALL_SQUARE_SUFFIX } from '../../constants';

import { FormGroup } from '@angular/forms';

import { QuestionBase } from '../../services/question-base';
import { QuestionControlService } from '../../services/question-control.service';
import { QuestionService } from '../../services/question.service'

@Component({
    selector: 'dropshipping_management',
    templateUrl: './dropshipping_management.component.html',
    styleUrls: ['./dropshipping_management.component.scss']
})

export class DropshippingManagementComponent {
    IMAGE_CDN_URL = IMAGE_CDN_URL
    GOOD_IMAGE_SMALL_SQUARE_SUFFIX = GOOD_IMAGE_SMALL_SQUARE_SUFFIX
    dropshippings: any;
    displayedColumns: string[] = ['good_images', 'good_name', 'brand_name', 'price', 'company_name', 'contact', 'link'];
    constructor(public dialog: MatDialog,
        private dropshippingApiService: DropshippingApiService,
        private bottomSheet: MatBottomSheet) {
    }

    ngOnInit(): void {
        this.fetchDropshippings();
    }

    applyFilter(filterValue: string) {
        this.dropshippings.filter = filterValue.trim().toLowerCase();
    }

    rowClick(row: any): void {
        this.bottomSheet.open(DropshippingInfoBottomSheet, { data: row });
    }

    fetchDropshippings(): void {
        this.dropshippingApiService.getAllDropshippings()
            .pipe(first())
            .subscribe(
                data => {
                    console.log(data)
                    this.dropshippings = new MatTableDataSource(data.dropshippings);
                },
                error => {
                    // this.loading = false;
                });
    }
    openDialog(): void {
        const dialogRef = this.dialog.open(AddNewDropshippingDialog, {
            maxWidth: 1080,
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            if (result) {
                console.log(result)
                this.dropshippingApiService.newDropshipping(result)
                    .pipe(first())
                    .subscribe(
                        data => {
                            this.fetchDropshippings();
                        });
            }
        });
    }

}

export interface NewDropshippingInfoScheme {
    name: string;
    address: string;
    phone: string;
    owner_name: string;
    tagtrack_code: string;
    note: string;
}


@Component({
    selector: 'new.dropshipping.dialog',
    templateUrl: 'new.dropshipping.dialog.html',
    styleUrls: ['./dropshipping_management.component.scss'],
    providers: [QuestionControlService, QuestionService]
})
export class AddNewDropshippingDialog {
    @Input() questions: QuestionBase<any>[] = [];
    form: FormGroup;
    payLoad = '';
    constructor(
        private questionService: QuestionService,
        private questionControlService: QuestionControlService,
        public dialogRef: MatDialogRef<AddNewDropshippingDialog>,
        @Inject(MAT_DIALOG_DATA) public data: NewDropshippingInfoScheme
    ) {
        this.questions = questionService.getNewDropShippingFormQuestions();
        this.form = this.questionControlService.toFormGroup(this.questions);
    }

    onSubmit() {
        this.payLoad = JSON.stringify(this.form.value);
        console.log(this.payLoad)
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}


@Component({
    selector: 'dropshipping.info.bottom.sheet',
    templateUrl: 'dropshipping.info.bottom.sheet.html',
    styleUrls: ['./dropshipping_management.component.scss']
})
export class DropshippingInfoBottomSheet {
    has_binded_owner = false;
    qrcode_data: string;
    dropshippingInfoData: any;
    constructor(private notificationService: NotificationService,
        private bottomSheetRef: MatBottomSheetRef<DropshippingInfoBottomSheet>,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private dropshippingApiService: DropshippingApiService) {
        this.dropshippingInfoData = data
    }

    updateStoreInfo(): void {
        // this.dropshippingApiService.updateDropshipping(this.dropshippingInfoData)
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