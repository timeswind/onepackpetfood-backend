import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {  CategoryManagementComponent } from './category_management.component';


const routes: Routes = [
    { 
        path: "",
        component: CategoryManagementComponent
    },

];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CategoryManagementRoutingModule { }