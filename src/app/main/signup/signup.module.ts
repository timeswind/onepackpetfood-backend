import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import  { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { SignupComponent } from './signup.component';
const routes = [
    {
        path     : "",
        component: SignupComponent
    }
];

@NgModule({
    declarations: [
        SignupComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule
    ]
})

export class SignupModule
{
}
