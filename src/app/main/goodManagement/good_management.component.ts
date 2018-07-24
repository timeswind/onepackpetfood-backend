import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpResponse } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { GoodApiService } from '../../services/good.api.service';
import { CategoryApiService } from '../../services/category.api.service';
import { AuthenticationService } from '../../services/authentication.service';
import { IMAGE_CDN_URL, GOOD_IMAGE_SMALL_SQUARE_SUFFIX, DEFAULT_ROOT_CATEGORY_SCOPE } from '../../constants';
import { NotificationService } from '../../services/notification.service';

export interface goodTableDisplayScheme {
    _id: string;
    name: string;
    view_count: number;
    stock: number;
    total_sales_count: number;
    created_at: Date;
    images: string[];
}

export interface priceSetScheme {
    name: string;
    price: number;
    count: number
}

export interface goodDialogScheme {
    name: string;
    description: string;
    images: string[];
    category: string;
    subtitle: string;
    price: number;
    price_sets: priceSetScheme[];
    strike_price: number;
    stock: number;
    show_stock: boolean;
    bar_code: string;
}

@Component({
    selector: 'good_management',
    templateUrl: './good_management.component.html',
    styleUrls: ['./good_management.component.scss']
})

export class GoodManagementComponent implements OnInit {
    IMAGE_CDN_URL = IMAGE_CDN_URL;
    GOOD_IMAGE_SMALL_SQUARE_SUFFIX = GOOD_IMAGE_SMALL_SQUARE_SUFFIX;
    displayedColumns: string[] = ['images', 'name', 'view_count', 'stock', 'total_sales_count', 'created_at'];
    allGoods: goodTableDisplayScheme[];
    constructor(
        private goodApiService: GoodApiService,
        private authenticationService: AuthenticationService,
        public dialog: MatDialog,
        private notificationService: NotificationService
    ) {

    }

    ngOnInit() {
        this.getAllGoods();
    }

    openAddGoodDialog(): void {
        const dialogRef = this.dialog.open(AddGoodDialog, {
            width: "100%",
            maxWidth: "none",
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            this.publishGood(result.data)
        });
    }

    publishGood(data: any) {
        this.goodApiService.newGood(data)
            .pipe(first())
            .subscribe(data => {
                if (data.success) {
                    this.notificationService.subj_notification.next("发布成功")
                    this.getAllGoods();
                }
                console.log(data)
            })
    }

    getAllGoods() {
        this.goodApiService.getStoreGoods()
            .pipe(first())
            .subscribe(data => {
                this.allGoods = data.goods
                console.log(data)
            })
    }
}

@Component({
    selector: 'add-root-directory-dialog',
    templateUrl: './add_good.dialog.html',
    styleUrls: ['./good_management.component.scss']
})
export class AddGoodDialog {
    IMAGE_CDN_URL = IMAGE_CDN_URL
    GOOD_IMAGE_SMALL_SQUARE_SUFFIX = GOOD_IMAGE_SMALL_SQUARE_SUFFIX
    rootCategories: any;
    rootCategorySelected: any = null;
    childCategories: any;
    newGoodData: goodDialogScheme;
    constructor(
        private authenticationService: AuthenticationService,
        private categoryApiService: CategoryApiService,
        public dialogRef: MatDialogRef<AddGoodDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.getRootCategories()
        this.newGoodData = {
            name: "",
            description: "",
            images: [],
            category: "",
            subtitle: "",
            price: null,
            price_sets: [],
            strike_price: null,
            stock: null,
            show_stock: false,
            bar_code: ""
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    prepareTokenToUploadImage(event): void {
        console.log(event.path[0].files[0])
        var file = event.path[0].files[0]
        const key = 'good_image/' + new Date().getTime()
        const pathname = '/' + key
        this.authenticationService.getCosUploadSigniture(pathname, 'put')
            .pipe(first())
            .subscribe(
                data => {
                    this.uploadFile(file, key, data.data)
                },
                error => {
                    // this.loading = false;
                });

    }

    uploadFile(file: any, key: string, data: any) {
        this.authenticationService.uploadFile(file, key, data).subscribe(event => {
            if (event instanceof HttpResponse) {
                console.log('File is completely uploaded!', event);
                if (event.status === 200 || event.status === 206) {
                    this.newGoodData.images.push('/' + key)
                }
            }
        });
    }

    private getRootCategories(): void {
        const scope = DEFAULT_ROOT_CATEGORY_SCOPE
        this.categoryApiService.getRootCategories(scope)
            .pipe(first())
            .subscribe(
                data => {
                    this.rootCategories = data.rootCategories
                    if (this.rootCategorySelected === null && data.rootCategories.length > 0) {
                        this.rootCategorySelected = data.rootCategories[0]["_id"]
                        this.getSecondaryCategories(data.rootCategories[0]["_id"])
                    }
                },
                error => {
                    // this.loading = false;
                });
    }

    private getSecondaryCategories(parent: string): void {
        const scope = DEFAULT_ROOT_CATEGORY_SCOPE
        this.categoryApiService.getChildCategories(parent)
            .pipe(first())
            .subscribe(
                data => {
                    if (data.success) {
                        this.childCategories = data.childCategories
                    }
                },
                error => {
                    // this.loading = false;
                });
    }

    addNewPriceSet() {
        this.newGoodData.price_sets.push({
            name: "",
            price: null,
            count: null
        })
        console.log(this.newGoodData.price_sets)
    }

    removePriceSet(index: number) {
        this.newGoodData.price_sets.splice(index, 1)
    }

    removeImage(index: number) {
        this.newGoodData.images.splice(index, 1)
    }

}