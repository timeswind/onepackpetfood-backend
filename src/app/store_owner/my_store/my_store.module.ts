import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule, MatButtonModule, MatCardModule} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { MyStoreRoutingModule } from "./my_store.routing.module";
import { MyStoreComponent } from './my_store.component';
import {  MapToIterable } from '../../pipes/map-to-iterable.pipe'
@NgModule({
    declarations: [
        MyStoreComponent,
        MapToIterable
    ],
    imports: [
        MyStoreRoutingModule,
        TranslateModule,
        FuseSharedModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule
    ]
})

export class MyStoreModule {
}
