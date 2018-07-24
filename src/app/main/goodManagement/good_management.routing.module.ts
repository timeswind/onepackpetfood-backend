import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GoodManagementComponent } from './good_management.component';


const routes: Routes = [
    {
        path: "",
        component: GoodManagementComponent
    },

];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class GoodManagementRoutingModule { }