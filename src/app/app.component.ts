import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { NotificationService } from 'app/services/notification.service';
import { navigationForAdmin, navigationForShopOwnerUser } from 'app/navigation/navigation';
import { locale as navigationEnglish } from 'app/navigation/i18n/en';
import { locale as navigationTurkish } from 'app/navigation/i18n/tr';
import { MatSnackBar } from '../../node_modules/@angular/material';
import { WindowRef } from 'app/services/native-window.service';

import { Store, select } from '@ngrx/store';
import { AppState } from './app.state';
import { selectAuthRole, selectAuthIsLogin } from './reducers/auth.reducer';
import { Router } from '@angular/router';
import * as AuthActions from './actions/auth.action';
@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    navigation: any;
    fuseConfig: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {FuseSplashScreenService} _fuseSplashScreenService
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {TranslateService} _translateService
     */
    constructor(
        private winRef: WindowRef,
        private notificationService: NotificationService,
        private snackBar: MatSnackBar,
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseSplashScreenService: FuseSplashScreenService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _translateService: TranslateService,
        private store: Store<AppState>,
        private router: Router
    ) {
        this.notificationService.subj_notification.subscribe(message => {
            snackBar.open(message, "", { duration: 2000 });
        });
        if (this.winRef.nativeWindow.navigator.appVersion.indexOf('wxwork') >= 0) {
            localStorage.setItem("isFromWxwork", "true")
        } else {
            localStorage.setItem("isFromWxwork", "false")
        }
        // Add languages
        this._translateService.addLangs(['en', 'tr']);

        // Set the default language
        this._translateService.setDefaultLang('en');

        // Set the navigation translations
        this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

        // Use a language
        this._translateService.use('en');

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    public relogin(): void {
        if (localStorage.getItem('currentUser')) {
            let data: any = JSON.parse(localStorage.getItem('currentUser'));
            this.store.dispatch(new AuthActions.UserLogin({
                name: data.name,
                email: data.email || "",
                role: data.role || 0,
                avatar: data.avatar || "",
                token: data.token,
                isLogin: true,
                redirectUrl: ""
            }))
        }
    }

    public observeUserLoginStatus(): void {
        console.log("observeUserLoginStatus")
        this.store.pipe(select(selectAuthIsLogin)).subscribe(isLogin => {
            if (!isLogin && window.location.pathname !== "/login" && window.location.pathname !== "/signup" && localStorage.getItem('isFromWxwork') === "false") {
                this.router.navigate(['/login']);
            } else if (!isLogin && window.location.pathname !== "/login" && localStorage.getItem('isFromWxwork') === "true") {
                localStorage.setItem("redirectUrl", location.href)
                location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=ww887fc00c230ccefc&redirect_uri=https://api.xiaoquanjia.com/api/public/wechat_work/login_redirect&response_type=code&scope=snsapi_base#wechat_redirect"
            }
        })
    }

    public loadNavigationSettings(): void {
        this.store.pipe(select(selectAuthRole)).subscribe(role => {
            if (role === 100) {
                this.navigation = navigationForAdmin;
            } else {
                this.navigation = navigationForShopOwnerUser;
            }
            if (this._fuseNavigationService.getNavigation('main')) {
                this._fuseNavigationService.unregister('main');
            }
            this._fuseNavigationService.register('main', this.navigation);
            this._fuseNavigationService.setCurrentNavigation('main');
        })
    }

    ngOnInit(): void {
        this.relogin();
        console.log("ngOnInit")
        let redirectUrl = localStorage.getItem("redirectUrl")
        if (redirectUrl && redirectUrl !== "") {
            localStorage.setItem("redirectUrl", "")
            location.href = redirectUrl
        }
        this.observeUserLoginStatus()
        this.loadNavigationSettings();
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.fuseConfig = config;
            });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }
}
