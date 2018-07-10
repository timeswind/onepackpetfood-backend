import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminAuthGuard } from 'app/services/auth.guard.service';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: "login",
        loadChildren: 'app/main/login/login.module#LoginModule'
    },
    {
        path: "signup",
        loadChildren: 'app/main/signup/signup.module#SignupModule'
    },
    {
        path: "tagtrace",
        loadChildren: 'app/main/tagtrace/tagtrace.module#TagtraceModule',
        canLoad: [AdminAuthGuard]
    },
    {
        path: "ordertrack",
        loadChildren: 'app/main/ordertrack/ordertrack.module#OrdertrackModule',
        canLoad: [AdminAuthGuard]
    },
    {
        path: "store_management",
        loadChildren: 'app/main/storeManagement/store.management.module#StoreManagementModule',
        canLoad: [AdminAuthGuard]
    },
    {
        path: "user_setting",
        loadChildren: 'app/main/userSetting/user.setting.module#UserSettingModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }