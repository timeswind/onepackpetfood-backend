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
import { AuthenticationService } from 'app/services/authentication.service';
import { TagtraceApiService } from 'app/services/tagtrace.api.service';
import { OrderApiService } from 'app/services/order.api.service';
import { StoreApiService } from 'app/services/store.api.service';
import { CategoryApiService } from 'app/services/category.api.service';

// import { AppState } from 'app/app.state';
import { AuthGuard, AdminAuthGuard, AlreadyLoginAuthGuard } from 'app/services/auth.guard.service';
import { NotificationService } from 'app/services/notification.service';
import { TokenInterceptor } from 'app/services/token.interceptor';
import {
    MatSnackBarModule
} from '@angular/material';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { reducer as AuthReducer } from './reducers/auth.reducer';
// import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { environment } from '../environments/environment'; // Angular CLI environemnt
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
        StoreModule.forRoot({
            // router: routerReducer,
            auth: AuthReducer
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
        // StoreRouterConnectingModule.forRoot({
        //     stateKey: 'router', // name of reducer key
        // })
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
        CategoryApiService,
        OrderApiService,
        NotificationService,
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
