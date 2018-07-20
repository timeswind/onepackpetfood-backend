import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { AuthenticationService } from '../../services/authentication.service';
// import { AppState } from '../../app.state';
import { first } from 'rxjs/operators';
// import { locale as english } from './i18n/en';
// import { locale as turkish } from './i18n/tr';
import { Store, select, createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';
import { selectAuthIsLogin } from '../../reducers/auth.reducer';
import * as AuthActions from '../../actions/auth.action'
import { CategoryApiService } from '../../services/category.api.service';

@Component({
    selector: 'category_management',
    templateUrl: './category_management.component.html',
    styleUrls: ['./category_management.component.scss']
})

export class CategoryManagementComponent implements OnInit {
    rootCategories: any;
    childCategories: any;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private categoryApiService: CategoryApiService,
        private store: Store<AppState>
    ) {

    }

    ngOnInit() {
        this.getRootCategories();
    }

    private getRootCategories(): void {
        const scope = "pet.supply.main.category"
        this.categoryApiService.getRootCategories(scope)
            .pipe(first())
            .subscribe(
                data => {
                    this.rootCategories = data.rootCategories
                },
                error => {
                    // this.loading = false;
                });
    }

    private getChildCategories(parent: string): void {
        this.categoryApiService.getChildCategories(parent)
            .pipe(first())
            .subscribe(
                data => {
                    this.childCategories = data.childCategories
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
                    }
                },
                error => {
                    // this.loading = false;
                });
    }
}