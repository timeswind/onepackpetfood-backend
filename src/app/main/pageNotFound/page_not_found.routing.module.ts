import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from './page_not_fount.component';


const routes: Routes = [
    {
        path: "",
        component: PageNotFoundComponent
    },

];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class PageNotFoundRoutingModule { }