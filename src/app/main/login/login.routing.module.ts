import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AlreadyLoginAuthGuard } from 'app/services/auth.guard.service';
import {  LoginComponent } from './login.component';


const routes: Routes = [
    { 
        path: "",
        component: LoginComponent,
        canActivate: [AlreadyLoginAuthGuard]
    },

];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class LoginRoutingModule { }