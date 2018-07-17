import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { AuthenticationService } from '../../services/authentication.service';

import { first } from 'rxjs/operators';
// import { locale as english } from './i18n/en';
// import { locale as turkish } from './i18n/tr';

export interface userInfoScheme {
    name: string;
    phone: string;
}

@Component({
    selector   : 'user-setting',
    templateUrl: './user.setting.component.html',
    styleUrls  : ['./user.setting.component.scss']
})

export class UserSettingComponent implements OnInit {
    userInfo:userInfoScheme = {
        name: "",
        phone: ""
    };
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {

    }
 
    ngOnInit() {
        this.authenticationService.getMyInfo()
        .pipe(first())
        .subscribe(
            data => {
                console.log(data)
                this.userInfo.name = data.userInfo.name || ""
                this.userInfo.phone = data.userInfo.phone || ""
            },
            error => {
                // this.loading = false;
            });
    }

    onSubmit() {
        console.log(this.userInfo)
        this.authenticationService.updateMyInfo(this.userInfo)
        .pipe(first())
        .subscribe(
            data => {
                if (data.success) {
                    // this.appState.setName(this.userInfo.name)
                    // let userInfo: any = JSON.parse(localStorage.getItem('currentUser'));
                    // userInfo["name"] = this.userInfo.name
                    // localStorage.setItem("currentUser", JSON.stringify(userInfo));
                }
            },
            error => {
                // this.loading = false;
            });
    }
}