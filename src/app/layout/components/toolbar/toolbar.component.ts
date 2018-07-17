import { Component, OnDestroy, OnInit, HostBinding } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { AuthenticationService } from '../../../services/authentication.service';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { AppState } from '../../../app.state';
import { Store, select, createSelector } from '@ngrx/store';
import { selectAuthName, selectAuthAvatar, selectAuthIsLogin } from '../../../reducers/auth.reducer';
import { Observable } from 'rxjs/Observable'
import * as AuthActions from '../../../actions/auth.action';
// import { navigation } from 'app/navigation/navigation';

@Component({
    selector   : 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls  : ['./toolbar.component.scss']
})

export class ToolbarComponent implements OnInit, OnDestroy
{
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    // navigation: any;
    selectedLanguage: any;
    showLoadingBar: boolean;
    userStatusOptions: any[];

    name: Observable<string>;
    avatar: Observable<string>;
    isLogin: Observable<boolean>;
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {Router} _router
     * @param {TranslateService} _translateService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private _router: Router,
        private _translateService: TranslateService,
        private authenticationService: AuthenticationService,
        private store: Store<AppState>
    )
    {
        this.name = this.store.pipe(select(selectAuthName))
        this.avatar = this.store.pipe(select(selectAuthAvatar))
        this.isLogin = this.store.pipe(select(selectAuthIsLogin))
        // this.appState.name
        // .subscribe((value: string) => this.useremail = value)

        // this.appState.avatar
        // .subscribe((value: string) => this.avatar = value)

        // this.appState.islogin
        // .subscribe((value: boolean) => this.isLogin = value)
        // Set the defaults
        // this.userStatusOptions = [
        //     {
        //         'title': 'Online',
        //         'icon' : 'icon-checkbox-marked-circle',
        //         'color': '#4CAF50'
        //     },
        //     {
        //         'title': 'Away',
        //         'icon' : 'icon-clock',
        //         'color': '#FFC107'
        //     },
        //     {
        //         'title': 'Do not Disturb',
        //         'icon' : 'icon-minus-circle',
        //         'color': '#F44336'
        //     },
        //     {
        //         'title': 'Invisible',
        //         'icon' : 'icon-checkbox-blank-circle-outline',
        //         'color': '#BDBDBD'
        //     },
        //     {
        //         'title': 'Offline',
        //         'icon' : 'icon-checkbox-blank-circle-outline',
        //         'color': '#616161'
        //     }
        // ];

        // this.languages = [
        //     {
        //         id   : 'en',
        //         title: 'English',
        //         flag : 'us'
        //     },
        //     {
        //         id   : 'tr',
        //         title: 'Turkish',
        //         flag : 'tr'
        //     }
        // ];

        // this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // this.appState.email.subscribe(params => {
        //     this.useremail = this.appState.email;
        // });
        // Subscribe to the router events to show/hide the loading bar
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationStart),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((event) => {
                this.showLoadingBar = true;
            });

        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd)
            )
            .subscribe((event) => {
                this.showLoadingBar = false;
            });

        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });

        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, {'id': this._translateService.currentLang});
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void
    {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * Search
     *
     * @param value
     */
    search(value): void
    {
        // Do your search here...
        console.log(value);
    }

    /**
     * Set the language
     *
     * @param langId
     */
    setLanguage(langId): void
    {
        // Set the selected language for toolbar
        this.selectedLanguage = _.find(this.languages, {'id': langId});

        // Use the selected language for translations
        this._translateService.use(langId);
    }

    logout(): void {
        this.store.dispatch(new AuthActions.UserLogout())
    }
}
