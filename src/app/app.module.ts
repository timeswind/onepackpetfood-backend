import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { AppRoutingModule } from 'app/app.routing.module';

import { AppServiceModule } from './services'
import {
    MatSnackBarModule
} from '@angular/material';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { reducer as AuthReducer } from './reducers/auth.reducer';
import { reducer as EssentialDataReducer } from './reducers/essential_data.reducer';
import { environment } from '../environments/environment'; // Angular CLI environemnt
import { MatPaginatorIntl } from '@angular/material';
import { MatPaginatorIntlChinese } from '../customize/MatPaginatorIntlChinese';
import { QuillModule } from 'ngx-quill';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        StoreModule.forRoot({
            // router: routerReducer,
            auth: AuthReducer,
            essentialData: EssentialDataReducer
        }),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
        }),
        BrowserAnimationsModule,
        HttpClientModule,
        // RouterModule.forRoot(appRoutes),
        TranslateModule.forRoot(),
        // Material moment date module
        MatMomentDateModule,

        // Material
        MatSnackBarModule,
        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        AppRoutingModule,
        AppServiceModule,
        QuillModule
    ],
    providers: [
        { provide: MatPaginatorIntl, useClass: MatPaginatorIntlChinese }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
