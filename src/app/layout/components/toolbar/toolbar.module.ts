import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatMenuModule, MatProgressBarModule, MatToolbarModule } from '@angular/material';

import { FuseSearchBarModule, FuseShortcutsModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

import { ToolbarComponent } from 'app/layout/components/toolbar/toolbar.component';
// import { AppState } from '../../../app.state';

@NgModule({
    declarations: [
        ToolbarComponent
    ],
    imports     : [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatToolbarModule,

        FuseSharedModule,
        FuseSearchBarModule,
        FuseShortcutsModule
    ],
    exports     : [
        ToolbarComponent
    ]
})
export class ToolbarModule
{
}
