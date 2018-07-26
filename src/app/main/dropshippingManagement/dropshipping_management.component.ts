import { Component, Inject, Input, ViewChild } from '@angular/core';
import { MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MAT_BOTTOM_SHEET_DATA, MatTableDataSource, MatBottomSheet, MatBottomSheetRef, MatPaginator } from '@angular/material';
import { DropshippingApiService } from '../../services/dropshipping.api.service';
import { first } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { NotificationService } from '../../services/notification.service';
// import { environment } from '../../../environments/environment';
import { IMAGE_CDN_URL, GOOD_IMAGE_SMALL_SQUARE_SUFFIX } from '../../constants';

import { FormGroup } from '@angular/forms';

import { QuestionBase } from '../../services/question-base';
import { QuestionControlService } from '../../services/question-control.service';
import { QuestionService } from '../../services/question.service'

export interface DropShippingTableElement {
    good_images: string[];
    good_name: string;
    brand_name: string;
    price: number;
    company_name: string;
    contact: string;
    link: string;
}

@Component({
    selector: 'dropshipping_management',
    templateUrl: './dropshipping_management.component.html',
    styleUrls: ['./dropshipping_management.component.scss']
})

export class DropshippingManagementComponent {
    IMAGE_CDN_URL = IMAGE_CDN_URL
    GOOD_IMAGE_SMALL_SQUARE_SUFFIX = GOOD_IMAGE_SMALL_SQUARE_SUFFIX
    dropshippings: any;
    dataSource = new MatTableDataSource<DropShippingTableElement>([]);
    selection = new SelectionModel<DropShippingTableElement>(true, []);
    displayedColumns: string[] = ['select', 'good_images', 'good_name', 'brand_name', 'price', 'company_name', 'contact', 'link', 'tools'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
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

    openBottomSheet(dropshipping: any): void {
        this.bottomSheet.open(DropshippingInfoBottomSheet, { data: dropshipping });
    }

    fetchDropshippings(): void {
        this.dropshippingApiService.getAllDropshippings()
            .pipe(first())
            .subscribe(
                data => {
                    console.log(data)
                    this.dropshippings = new MatTableDataSource(data.dropshippings);
                    this.dropshippings.paginator = this.paginator;
                    this.dropshippings.sort = this.sort;
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
            console.log('The dialog was closed 1', result);
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

    openEditDialog(data): void {
        const dialogRef = this.dialog.open(AddNewDropshippingDialog, {
            maxWidth: 1080,
            data: data
        });
        console.log(data)
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed 2', result);
            if (result) {
                console.log(result)
                result["_id"] = data._id
                this.dropshippingApiService.updateDropshipping(result)
                    .pipe(first())
                    .subscribe(
                        data => {
                            this.fetchDropshippings();
                        });
            }
        });
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    deleteItem(dropshipping: any) {
        const confirmDelete = window.confirm("确认删除？");
        if (confirmDelete) {
            this.dropshippingApiService.delete(dropshipping._id)
                .pipe(first())
                .subscribe(
                    data => {
                        this.fetchDropshippings();
                    });
        }
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
    title: string;
    payLoad = '';
    constructor(
        private questionService: QuestionService,
        private questionControlService: QuestionControlService,
        public dialogRef: MatDialogRef<AddNewDropshippingDialog>,
        @Inject(MAT_DIALOG_DATA) public data: NewDropshippingInfoScheme
    ) {
        this.questions = questionService.getNewDropShippingFormQuestions();
        this.form = this.questionControlService.toFormGroup(this.questions, data);
        if ('_id' in data) {
            this.title = "编辑一件代发信息"
        } else {
            this.title = "新增一件代发信息"
        }
    }

    onSubmit() {
        this.payLoad = JSON.stringify(this.form.value);
        console.log(this.payLoad)
    }

    onNoClick(form: any): void {
        console.log(form)
        this.dialogRef.close();
    }

}


@Component({
    selector: 'dropshipping.info.bottom.sheet',
    templateUrl: 'dropshipping.info.bottom.sheet.html',
    styleUrls: ['./dropshipping_management.component.scss']
})
export class DropshippingInfoBottomSheet {
    dropshippingInfoData: any;
    constructor(
        private bottomSheetRef: MatBottomSheetRef<DropshippingInfoBottomSheet>,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
        private dropshippingApiService: DropshippingApiService) {
        this.dropshippingInfoData = data
    }

    updateDropShippingInfo(): void {
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