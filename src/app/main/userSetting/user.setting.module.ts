import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import  { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { UserSettingComponent } from './user.setting.component';
const routes = [
    {
        path     : 'usersetting',
        component: UserSettingComponent
    }
];

@NgModule({
    declarations: [
        UserSettingComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule
    ],
    exports     : [
        UserSettingComponent
    ]
})

export class UserSettingModule
{
}
