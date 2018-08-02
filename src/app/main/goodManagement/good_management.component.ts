import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpResponse } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { GoodApiService } from '../../services/good.api.service';
import { CategoryApiService } from '../../services/category.api.service';
import { AuthenticationService } from '../../services/authentication.service';

import { IMAGE_CDN_URL, GOOD_IMAGE_SMALL_SQUARE_SUFFIX, DEFAULT_ROOT_CATEGORY_SCOPE } from '../../constants';
import { NotificationService } from '../../services/notification.service';
import { goodTableDisplayScheme, GoodInterface, Good, priceSetScheme, specificationScheme } from '../../models/good.model'
import * as EssentialDataAction from '../../actions/essential_data.action'
import { AppState } from '../../app.state';
import { Store, select } from '@ngrx/store';
import { selectEssentialDataRootCategories, selectEssentialDataChildCategoriesCollection } from '../../reducers/essential_data.reducer';
import { Dropshipping } from '../../models/dropshipping.model';

@Component({
    selector: 'good_management',
    templateUrl: './good_management.component.html',
    styleUrls: ['./good_management.component.scss']
})

export class GoodManagementComponent implements OnInit {
    IMAGE_CDN_URL = IMAGE_CDN_URL;
    GOOD_IMAGE_SMALL_SQUARE_SUFFIX = GOOD_IMAGE_SMALL_SQUARE_SUFFIX;
    displayedColumns: string[] = ['images', 'name', 'view_count', 'stock', 'total_sales_count', 'created_at', 'tools'];
    allGoods: goodTableDisplayScheme[];
    constructor(
        private goodApiService: GoodApiService,
        private categoryApiService: CategoryApiService,
        public dialog: MatDialog,
        private notificationService: NotificationService,
        private store: Store<AppState>
    ) {

    }

    ngOnInit() {
        this.getAllGoods();
        this.fetchCategoriesData();
    }

    fetchCategoriesData() {
        this.categoryApiService.getCategoriesData(DEFAULT_ROOT_CATEGORY_SCOPE).pipe(first()).subscribe(data => {
            this.store.dispatch(new EssentialDataAction.SetRootCategories({
                rootCategories: data.rootCategories
            }))
            this.store.dispatch(new EssentialDataAction.SetChildCategoriesCollection({
                childCategoriesCollection: data.childCategoriesCollection
            }))
        })
    }

    openAddGoodDialog(): void {
        const dialogRef = this.dialog.open(AddGoodDialog, {
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            // console.log('The dialog was closed 1', result);
            if (result && result.data) {
                this.publishGood(result.data)
            }
        });
    }

    openEditDialog(data: any): void {
        const dialogRef = this.dialog.open(AddGoodDialog, {
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed 2', result);
            if (result && result.data) {
                const newGood: Good = new Good()
                newGood.initFromData(result.data)
                this.updateGood(newGood.toObject())
            }
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

    updateGood(data: GoodInterface) {
        this.goodApiService.updateGood(data)
            .pipe(first())
            .subscribe(data => {
                if (data.success) {
                    this.notificationService.subj_notification.next("更新成功")
                    this.getAllGoods();
                }
                console.log(data)
            })
    }

    deleteItem(data: Dropshipping) {
        const confirmDelete = window.confirm("确认删除？");
        if (confirmDelete) {
            this.goodApiService.delete(data._id)
                .pipe(first())
                .subscribe(data => {
                    if (data.success) {
                        this.notificationService.subj_notification.next("删除成功")
                        this.getAllGoods();
                    }
                    console.log(data)
                })
        }
    }

    getAllGoods() {
        this.goodApiService.getStoreGoods()
            .pipe(first())
            .subscribe(data => {
                this.allGoods = data.goods
                console.log(data)
            })
    }

    togglePublishState(element: GoodInterface) {
        this.goodApiService.togglePublished(element)
            .pipe(first())
            .subscribe(data => {
                if (data.success) {
                    this.getAllGoods();
                    this.notificationService.subj_notification.next(`${element.published ? '下架' : '上架'}成功`)
                }
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
    newGoodData: GoodInterface;
    rootCategoryOptions: any[];
    childCategoryOptions: any[];
    title: string;
    proceed_button_text: string;
    selectedPriceSetIndex: number = -1;
    constructor(
        private notificationService: NotificationService,
        private authenticationService: AuthenticationService,
        public dialogRef: MatDialogRef<AddGoodDialog>,
        private store: Store<AppState>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.newGoodData = {
            name: "",
            description: "",
            images: [],
            root_category: "",
            category: "",
            subtitle: "",
            price: null,
            cost_price: null,
            price_sets: [],
            specifications: [],
            strike_price: null,
            stock: null,
            show_stock: false,
            published: false,
            bar_code: ""
        }
        if ('_id' in data) {
            this.title = "编辑商品信息"
            this.proceed_button_text = "更新"
            this.newGoodData = data
            this.rootCategoryOnSelect({ value: data.root_category })
        } else {
            this.title = "发布新商品信息"
            this.proceed_button_text = "添加"
        }
    }

    ngOnInit(): void {
        this.store.pipe(select(selectEssentialDataRootCategories)).subscribe(data => {
            const mdata = data.map((category) => {
                return { key: category._id, value: category.name }
            })
            this.rootCategoryOptions = mdata
        })
    }

    rootCategoryOnSelect(event) {
        this.store.pipe(select(selectEssentialDataChildCategoriesCollection)).subscribe(data => {
            const mdata = data[event.value].map((category) => {
                return { key: category._id, value: category.name }
            })
            this.childCategoryOptions = mdata
        })
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onImageDrop(event) {
        event.preventDefault();

        if ('index' in event.target.dataset) {
            var index = event.target.dataset.index
            var file = event.dataTransfer.files[0]
            if (file.type.indexOf('image') === -1) {
                alert("您拖的不是图片！");
                return false;
            } else {
                const key = 'dropshipping_image/' + new Date().getTime() + file.name
                const pathname = '/' + key
                this.notificationService.subj_notification.next("图片上传中")
                this.authenticationService.getCosUploadSigniture(pathname, 'put')
                    .pipe(first())
                    .subscribe(
                        data => {
                            this.uploadFileForPriceSet(file, key, data.data, index)
                        });
            }
        } else {
            var file = event.dataTransfer.files[0]
            if (file.type.indexOf('image') === -1) {
                alert("您拖的不是图片！");
                return false;
            } else {
                const key = 'dropshipping_image/' + new Date().getTime() + file.name
                const pathname = '/' + key
                this.notificationService.subj_notification.next("图片上传中")
                this.authenticationService.getCosUploadSigniture(pathname, 'put')
                    .pipe(first())
                    .subscribe(
                        data => {
                            this.uploadFile(file, key, data.data)
                        });
            }
        }
    }

    onDragOver(event) {
        event.stopPropagation();
        event.preventDefault();
    }

    prepareTokenToUploadImageForPriceSet(event): void {
        var file = event.path[0].files[0]
        const key = 'good_image/' + new Date().getTime() + file.name
        const pathname = '/' + key
        this.notificationService.subj_notification.next("图片上传中")
        this.authenticationService.getCosUploadSigniture(pathname, 'put')
            .pipe(first())
            .subscribe(
                data => {
                    this.uploadFileForPriceSet(file, key, data.data)
                });

    }

    uploadFileForPriceSet(file: any, key: string, data: any, index?:number) {
        this.authenticationService.uploadFile(file, key, data).subscribe(event => {
            if (event instanceof HttpResponse) {
                if (event.status === 200 || event.status === 206) {
                    this.notificationService.subj_notification.next("图片上传成功")
                    if (index) {
                        this.newGoodData.price_sets[index]["image"] = '/' + key
                    } else {
                        this.newGoodData.price_sets[this.selectedPriceSetIndex]["image"] = '/' + key
                    }
                }
            }
        });
    }

    prepareTokenToUploadImage(event): void {
        var file = event.path[0].files[0]
        const key = 'good_image/' + new Date().getTime() + file.name
        const pathname = '/' + key
        this.notificationService.subj_notification.next("图片上传中")
        this.authenticationService.getCosUploadSigniture(pathname, 'put')
            .pipe(first())
            .subscribe(
                data => {
                    this.uploadFile(file, key, data.data)
                });

    }

    removeImageInPriceSet(index) {
        this.newGoodData.price_sets[index]["image"] = null
    }

    uploadFile(file: any, key: string, data: any) {
        this.authenticationService.uploadFile(file, key, data).subscribe(event => {
            if (event instanceof HttpResponse) {
                if (event.status === 200 || event.status === 206) {
                    this.notificationService.subj_notification.next("图片上传成功")
                    this.newGoodData.images.push('/' + key)
                }
            }
        });
    }

    addNewPriceSet() {
        var price_set: priceSetScheme;
        price_set = {
            name: "",
            price: null,
            count: null
        }
        this.newGoodData.price_sets.push(price_set)
    }

    removePriceSet(index: number) {
        this.newGoodData.price_sets.splice(index, 1)
    }

    addNewSpecification() {
        if (!('specification' in this.newGoodData)) {
            this.newGoodData["specifications"] = []
        }
        var specification: specificationScheme;
        specification = {
            key: "",
            value: "",
        }
        this.newGoodData.specifications.push(specification)
    }

    removeSpecification(index: number) {
        this.newGoodData.specifications.splice(index, 1)
    }

    removeImage(index: number) {
        this.newGoodData.images.splice(index, 1)
    }

}