import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MyStoreComponent } from './my_store.component';


const routes: Routes = [
    {
        path: "",
        component: MyStoreComponent
    },

];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class MyStoreRoutingModule { }