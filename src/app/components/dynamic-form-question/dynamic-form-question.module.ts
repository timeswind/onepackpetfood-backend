import { NgModule } from '@angular/core'
import { DynamicFormQuestionComponent } from './dynamic-form-question.component'
import {
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule
} from '@angular/material';
import { DynamicFormQuestionDropdownInputComponent } from './dropdown-input.component'
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RichTextEdiorModule } from 'app/components/richTextEditor/rich-text-editor.module'

@NgModule({
    declarations: [DynamicFormQuestionComponent, DynamicFormQuestionDropdownInputComponent],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatRadioModule,
        MatSelectModule,
        MatCheckboxModule,
        MatIconModule,
        RichTextEdiorModule
    ],
    exports: [DynamicFormQuestionComponent, DynamicFormQuestionDropdownInputComponent]
})
export class DynamicFormQuestionModule { }