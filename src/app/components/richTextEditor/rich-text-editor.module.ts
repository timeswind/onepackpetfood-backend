import { NgModule } from '@angular/core'
import { RichTextEdior } from './rich-text-editor.component'
import { QuillModule } from 'ngx-quill'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material'
@NgModule({
    declarations: [RichTextEdior],
    imports: [QuillModule, CommonModule, FormsModule, MatButtonModule],
    exports: [RichTextEdior]
})
export class RichTextEdiorModule { }