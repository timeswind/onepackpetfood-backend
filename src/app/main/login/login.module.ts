import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import  { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { LoginComponent } from './login.component';
const routes = [
    {
        path     : 'login',
        component: LoginComponent
    }
];

@NgModule({
    declarations: [
        LoginComponent
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
        LoginComponent
    ]
})

export class LoginModule
{
}
