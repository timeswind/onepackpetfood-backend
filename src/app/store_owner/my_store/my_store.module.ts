import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule, MatButtonModule, MatCardModule, MatGridListModule} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { MyStoreRoutingModule } from "./my_store.routing.module";
import { MyStoreComponent } from './my_store.component';
import { PipeModule } from 'app/pipes/pipi.module';

@NgModule({
    declarations: [
        MyStoreComponent
    ],
    imports: [
        MyStoreRoutingModule,
        TranslateModule,
        FuseSharedModule,
        PipeModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatGridListModule
    ]
})

export class MyStoreModule {
}
