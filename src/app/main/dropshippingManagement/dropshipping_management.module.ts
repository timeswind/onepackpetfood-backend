import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatRadioModule, MatListModule, MatBottomSheetModule, MatSelectModule } from '@angular/material';
import { QRCodeModule } from 'angularx-qrcode';
import { ReactiveFormsModule } from '@angular/forms';
import { FuseSharedModule } from '@fuse/shared.module';
import { DynamicFormQuestionComponent } from '../../components/dynamic-form-question.component'
import { DropshippingManagementComponent, AddNewDropshippingDialog, DropshippingInfoBottomSheet } from './dropshipping_management.component';
import { AdminAuthGuard } from 'app/services/auth.guard.service';
import {  MapToIterable } from '../../pipes/map-to-iterable.pipe'

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
        MapToIterable
    ],
    imports: [
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        FuseSharedModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatRadioModule,
        MatListModule,
        MatSelectModule,
        MatBottomSheetModule,
        QRCodeModule
    ],
    entryComponents: [DropshippingManagementComponent, AddNewDropshippingDialog, DropshippingInfoBottomSheet, DynamicFormQuestionComponent]
})

export class DropshippingManagementModule {
}