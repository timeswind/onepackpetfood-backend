import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { CategoryManagementRoutingModule } from "./category_management.routing.module";
import { CategoryManagementComponent } from './category_management.component';

@NgModule({
    declarations: [
        CategoryManagementComponent
    ],
    imports: [
        CategoryManagementRoutingModule,
        TranslateModule,
        FuseSharedModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule
    ]
})

export class CategoryManagementModule {
}
