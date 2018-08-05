import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import  { MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatRadioModule, MatListModule, MatBottomSheetModule,MatSelectModule} from '@angular/material';
import { CommonModule} from "@angular/common"
import { FuseSharedModule } from '@fuse/shared.module';

import { OrdertrackComponent, OrderDetailDialog, OrderInfoBottomSheet } from './ordertrack.component';
import { AdminAuthGuard } from 'app/services/auth.guard.service';

const routes = [
    {
        path     : '',
        component: OrdertrackComponent,
        canActivate: [AdminAuthGuard]
    }
];

@NgModule({
    declarations: [
        OrdertrackComponent,
        OrderDetailDialog,
        OrderInfoBottomSheet
    ],
    imports     : [
        RouterModule.forChild(routes),
        TranslateModule,
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
        CommonModule
    ],
    entryComponents: [OrdertrackComponent, OrderDetailDialog, OrderInfoBottomSheet]
})

export class OrdertrackModule
{

}