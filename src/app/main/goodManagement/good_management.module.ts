import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatSelectModule
,MatTableModule, MatCheckboxModule, MatIconModule } from '@angular/material';
import { GoodManagementRoutingModule } from "./good_management.routing.module";
import { GoodManagementComponent, AddGoodDialog } from './good_management.component';

@NgModule({
    declarations: [
        GoodManagementComponent,
        AddGoodDialog
    ],
    imports: [
        GoodManagementRoutingModule,
        MatFormFieldModule,
        MatButtonModule,
        FormsModule,
        MatInputModule,
        MatDialogModule,
        MatSelectModule,
        MatTableModule,
        MatCheckboxModule,
        MatIconModule,
        CommonModule
    ],
    entryComponents: [GoodManagementComponent, AddGoodDialog]
})

export class GoodManagementModule {
}
