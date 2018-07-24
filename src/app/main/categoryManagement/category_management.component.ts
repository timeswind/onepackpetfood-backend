import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { first } from 'rxjs/operators';
// import { locale as english } from './i18n/en';
// import { locale as turkish } from './i18n/tr';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { CategoryApiService } from '../../services/category.api.service';
import { AuthenticationService } from '../../services/authentication.service';
import { DEFAULT_ROOT_CATEGORY_SCOPE, IMAGE_CDN_URL, CATEGORY_ICON_RESIZE_SUFFIX } from '../../constants';
import { NotificationService } from '../../services/notification.service';

export interface categoryScheme {
    _id: string;
    name: string;
    image: string;
    parent: string;
}

@Component({
    selector: 'category_management',
    templateUrl: './category_management.component.html',
    styleUrls: ['./category_management.component.scss']
})

export class CategoryManagementComponent implements OnInit {
    IMAGE_CDN_URL = IMAGE_CDN_URL;
    CATEGORY_ICON_RESIZE_SUFFIX = CATEGORY_ICON_RESIZE_SUFFIX;
    rootCategories: any;
    rootCategorySelected: any = null;
    childCategories: any;
    selectedCategory: categoryScheme;
    displayedColumns: string[] = ['id', 'name', 'image'];
    @ViewChild('uploader', { read: ElementRef }) uploader: ElementRef;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private categoryApiService: CategoryApiService,
        private authenticationService: AuthenticationService,
        private store: Store<AppState>,
        public dialog: MatDialog,
        private notificationService: NotificationService
    ) {

    }

    ngOnInit() {
        this.getRootCategories();
    }

    openAddRootCategoryDialog(): void {
        const dialogRef = this.dialog.open(AddRootCategoryDialog, {
            width: '250px',
            data: { parent: null, title: "添加一级类目" }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            if (result.name) {
                this.createNewCategory(result.scope, null, result.name)
            }
        });
    }

    openAddCategoryDialog(parent: string): void {
        const dialogRef = this.dialog.open(AddRootCategoryDialog, {
            width: '250px',
            data: { parent: parent, title: "添加二级类目" }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            if (result.name) {
                this.createNewCategory(result.scope, parent, result.name)
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

    private createNewCategory(scope: string, parent: string, name: string): void {
        const newCategoryData = {
            scope: scope,
            parent: parent,
            name: name
        }
        this.categoryApiService.newCategory(newCategoryData)
            .pipe(first())
            .subscribe(
                data => {
                    console.log(data)
                    if (data.success) {
                        this.getRootCategories()
                        if (data.category && data.category.parent) {
                            this.getSecondaryCategories(this.rootCategorySelected)
                        }
                        this.notificationService.subj_notification.next("添加成功")
                    }

                },
                error => {
                    // this.loading = false;
                });
    }

    tdClick(selectedCategory: categoryScheme) {
        this.selectedCategory = selectedCategory;
        // from http://stackoverflow.com/a/32010791/217408
        let event = new MouseEvent('click', { bubbles: true });
        this.uploader.nativeElement.dispatchEvent(event);
    }

    prepareTokenToUploadImage(event): void {
        console.log(event.path[0].files[0])
        var file = event.path[0].files[0]
        const key = 'category_icon/' + this.selectedCategory._id + new Date().getTime()
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
                    this.selectedCategory["image"] = '/' + key
                    this.updateCategory(this.selectedCategory);
                }
            }
        });
    }

    private updateCategory(data: categoryScheme): void {
        this.categoryApiService.updateCategory(data)
            .pipe(first())
            .subscribe(data => {
                console.log(data)
            },
                error => {
                    // this.loading = false;
                });
    }
}

@Component({
    selector: 'add-root-directory-dialog',
    template: `
    <h1 mat-dialog-title>{{data.title}}</h1>
    <div mat-dialog-content>
    <mat-form-field>
        <input matInput placeholder="SCOPE" readonly="true" [(ngModel)]="scope">
    </mat-form-field>
    <mat-form-field>
        <input placeholder="名字" matInput [(ngModel)]="name">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">取消</button>
      <button mat-button [mat-dialog-close]="{scope: scope, name: name, parent: null}" cdkFocusInitial>添加</button>
    </div>
    `
})
export class AddRootCategoryDialog {
    scope = DEFAULT_ROOT_CATEGORY_SCOPE;
    constructor(
        public dialogRef: MatDialogRef<AddRootCategoryDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}