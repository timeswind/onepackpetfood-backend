import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import {AppRoutingModule } from 'app/app.routing.module';
import { AuthenticationService } from 'app/services/authentication.service';
import { TagtraceApiService } from 'app/services/tagtrace.api.service';
import { OrderApiService } from 'app/services/order.api.service';
import  { StoreApiService } from 'app/services/store.api.service';
import { AppState } from 'app/app.state';
import { AuthGuard, AdminAuthGuard, AlreadyLoginAuthGuard } from 'app/services/auth.guard.service';
import { NotificationService } from 'app/services/notification.service';
import { TokenInterceptor } from 'app/services/token.interceptor';
import {
    MatSnackBarModule
  } from '@angular/material';
// const appRoutes: Routes = [
//     {
//         path: '**',
//         redirectTo: 'login'
//     }
// ];
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
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
        // SignupModule,
        // TagtraceModule,
        // LoginModule,
        // StoreManagementModule,
        // UserSettingModule
    ],
    providers: [
        AuthenticationService,
        TagtraceApiService,
        StoreApiService,
        OrderApiService,
        NotificationService,
        AppState,
        AuthGuard,
        AdminAuthGuard,
        AlreadyLoginAuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
