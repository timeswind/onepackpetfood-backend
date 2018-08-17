import { NgModule } from '@angular/core';
import { PageNotFoundRoutingModule } from "./page_not_found.routing.module";
import { PageNotFoundComponent } from './page_not_fount.component';

@NgModule({
    declarations: [
        PageNotFoundComponent
    ],
    imports: [
        PageNotFoundRoutingModule
    ]
})

export class PageNotFoundModule {
}
