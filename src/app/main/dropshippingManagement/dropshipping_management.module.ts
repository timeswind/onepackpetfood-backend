import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
    MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatRadioModule, MatListModule, MatBottomSheetModule,
    MatSelectModule, MatPaginatorModule, MatSortModule, MatCheckboxModule, MatIconModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FuseSharedModule } from '@fuse/shared.module';
import { DynamicFormQuestionComponent } from '../../components/dynamic-form-question/dynamic-form-question.component'
import { DropshippingManagementComponent, AddNewDropshippingDialog, DropshippingInfoBottomSheet } from './dropshipping_management.component';
import { AdminAuthGuard } from 'app/services/auth.guard.service';
import { PipeModule } from 'app/pipes/pipi.module';
import { DynamicFormQuestionDropdownInputComponent } from 'app/components/dynamic-form-question/dropdown-input.component'
const routes = [
    {
        path: '',
        component: DropshippingManagementComponent,
        canActivate: [AdminAuthGuard]
    }
];

@NgModule({
    declarations: [
        DropshippingManagementComponent,
        AddNewDropshippingDialog,
        DropshippingInfoBottomSheet,
        DynamicFormQuestionComponent,
        DynamicFormQuestionDropdownInputComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        FuseSharedModule,
        PipeModule,
        MatIconModule,
        MatTableModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatRadioModule,
        MatListModule,
        MatSelectModule,
        MatSortModule,
        MatBottomSheetModule,
        MatPaginatorModule
    ],
    entryComponents: [DropshippingManagementComponent, AddNewDropshippingDialog, DropshippingInfoBottomSheet, DynamicFormQuestionComponent, DynamicFormQuestionDropdownInputComponent]
})

export class DropshippingManagementModule { }