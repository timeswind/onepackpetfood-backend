import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatSelectModule
,MatTableModule, MatIconModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { CategoryManagementRoutingModule } from "./category_management.routing.module";
import { CategoryManagementComponent, AddRootCategoryDialog } from './category_management.component';

@NgModule({
    declarations: [
        CategoryManagementComponent,
        AddRootCategoryDialog
    ],
    imports: [
        CategoryManagementRoutingModule,
        TranslateModule,
        FuseSharedModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatDialogModule,
        MatSelectModule,
        MatTableModule,
        MatIconModule
    ],
    entryComponents: [CategoryManagementComponent, AddRootCategoryDialog]

})

export class CategoryManagementModule {
}
