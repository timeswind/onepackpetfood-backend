import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatCheckboxModule,
    MatListModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FuseSharedModule } from '@fuse/shared.module';
import { DropshippingManagementComponent, AddNewDropshippingDialog, DropshippingInfoBottomSheet } from './dropshipping_management.component';
import { AdminAuthGuard } from 'app/services/auth.guard.service';
import { PipeModule } from 'app/pipes/pipi.module';
import { RichTextEdiorModule } from 'app/components/richTextEditor/rich-text-editor.module';
import { DynamicFormQuestionModule } from 'app/components/dynamic-form-question/dynamic-form-question.module'

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
        DropshippingInfoBottomSheet
    ],
    imports: [
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        FuseSharedModule,
        PipeModule,
        MatIconModule,
        MatTableModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatSortModule,
        MatCheckboxModule,
        MatBottomSheetModule,
        MatPaginatorModule,
        DynamicFormQuestionModule,
        RichTextEdiorModule,
        MatListModule
    ],
    entryComponents: [DropshippingManagementComponent, AddNewDropshippingDialog, DropshippingInfoBottomSheet]
})

export class DropshippingManagementModule { }