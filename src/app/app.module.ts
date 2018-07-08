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
import { SampleModule } from 'app/main/sample/sample.module';
import { TagtraceModule } from 'app/main/tagtrace/tagtrace.module';
import { LoginModule } from 'app/main/login/login.module';
import { SignupModule } from 'app/main/signup/signup.module';
import { UserSettingModule } from 'app/main/userSetting/user.setting.module';
import { StoreManagementModule } from 'app/main/storeManagement/store.management.module';
import { AuthenticationService } from 'app/services/authentication.service';
import { TagtraceApiService } from 'app/services/tagtrace.api.service';
import  { StoreApiService } from 'app/services/store.api.service';
import { AppState } from 'app/app.state';
import { AuthGuard, AlreadyLoginAuthGuard } from 'app/services/auth.guard.service';
import { TokenInterceptor } from 'app/services/token.interceptor';

const appRoutes: Routes = [
    {
        path: '**',
        redirectTo: 'login'
    }
];
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule,
        SignupModule,
        TagtraceModule,
        LoginModule,
        StoreManagementModule,
        UserSettingModule
    ],
    providers: [
        AuthenticationService,
        TagtraceApiService,
        StoreApiService,
        AppState,
        AuthGuard,
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
