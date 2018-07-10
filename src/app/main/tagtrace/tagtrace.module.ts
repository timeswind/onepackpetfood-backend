import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import  { MatTableModule,
     MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatRadioModule, MatListModule, MatBottomSheetModule,MatSelectModule} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TagtraceComponent, DialogOverviewExampleDialog, BottomSheetOverviewExampleSheet } from './tagtrace.component';
import { AdminAuthGuard } from 'app/services/auth.guard.service';

const routes = [
    {
        path     : '',
        component: TagtraceComponent,
        canActivate: [AdminAuthGuard]
    }
];

@NgModule({
    declarations: [
        TagtraceComponent,
        DialogOverviewExampleDialog,
        BottomSheetOverviewExampleSheet
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
    entryComponents: [TagtraceComponent, DialogOverviewExampleDialog, BottomSheetOverviewExampleSheet]
})

export class TagtraceModule
{
}
