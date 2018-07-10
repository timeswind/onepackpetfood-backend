import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import  { MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatRadioModule, MatListModule, MatBottomSheetModule,MatSelectModule} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { StoreManagementComponent, AddNewStoreDialog, StoreInfoBottomSheet } from './store.management.component';
import { AuthGuard } from 'app/services/auth.guard.service';

const routes = [
    {
        path     : '',
        component: StoreManagementComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        StoreManagementComponent,
        AddNewStoreDialog,
        StoreInfoBottomSheet
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
        MatBottomSheetModule
    ],
    entryComponents: [StoreManagementComponent, AddNewStoreDialog, StoreInfoBottomSheet]
})

export class StoreManagementModule
{
}