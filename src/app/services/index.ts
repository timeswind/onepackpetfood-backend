import { NgModule } from '@angular/core';
import { TokenInterceptor } from 'app/services/token.interceptor';
// import { StorageService } from 'app/services/storage.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard, AdminAuthGuard, AlreadyLoginAuthGuard } from './auth.guard.service'
import { NotificationService } from 'app/services/notification.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { TagtraceApiService } from 'app/services/tagtrace.api.service';
import { OrderApiService } from 'app/services/order.api.service';
import { StoreApiService } from 'app/services/store.api.service';
import { CategoryApiService } from 'app/services/category.api.service';
import { GoodApiService } from 'app/services/good.api.service';
import { DropshippingApiService } from 'app/services/dropshipping.api.service';
@NgModule({
    providers: [
        AuthGuard,
        AdminAuthGuard,
        AlreadyLoginAuthGuard,
        // StorageService,
        AuthenticationService,
        NotificationService,
        TagtraceApiService,
        OrderApiService,
        StoreApiService,
        CategoryApiService,
        GoodApiService,
        DropshippingApiService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ]
})

export class AppServiceModule { }