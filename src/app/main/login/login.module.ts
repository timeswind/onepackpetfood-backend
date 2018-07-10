import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import  { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import {LoginRoutingModule  } from "./login.routing.module";
import { LoginComponent } from './login.component';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports     : [
        LoginRoutingModule,
        TranslateModule,
        FuseSharedModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule
    ]
})

export class LoginModule
{
}
