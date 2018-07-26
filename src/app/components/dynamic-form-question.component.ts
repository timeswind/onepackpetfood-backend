import { QuestionBase, ArraySetQuestion } from '../services/question-base';
import { Component, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'app/services/authentication.service'
import { first } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { IMAGE_CDN_URL, GOOD_IMAGE_SMALL_SQUARE_SUFFIX } from '../constants';

@Component({
    selector: 'dynamic-question',
    templateUrl: './dynamic-form-question.component.html',
    styleUrls: ['./dynamic-form-question.component.scss']
})

export class DynamicFormQuestionComponent {
    IMAGE_CDN_URL = IMAGE_CDN_URL
    GOOD_IMAGE_SMALL_SQUARE_SUFFIX = GOOD_IMAGE_SMALL_SQUARE_SUFFIX
    @Input() question: QuestionBase<any>;
    @Input() form: FormGroup;

    get isValid() { return this.form.controls[this.question.key].valid; }

    constructor(private authenticationService: AuthenticationService,
        private formBuilder: FormBuilder) {

    }

    ngOnInit(): void {

    }

    createItem(questions): FormGroup {
        let group: any = {};

        questions.array.forEach(question => {
            group[question.key] = null
        });

        return this.formBuilder.group(group);
    }

    addItem(): void {
        (this.form.get(this.question.key) as FormArray).push(this.createItem(this.question as ArraySetQuestion));
    }

    removeFormArray(index): void {
        (this.form.get(this.question.key) as FormArray).removeAt(index)
    }

    removeImage(index): void {
        var images = this.form.get(this.question.key).value
        images.splice(index, 1)
        this.form.controls[this.question.key].setValue(images)
    }

    prepareTokenToUploadImage(event): void {
        var file = event.path[0].files[0]
        const key = 'dropshipping_image/' + new Date().getTime() + file.name
        const pathname = '/' + key
        this.authenticationService.getCosUploadSigniture(pathname, 'put')
            .pipe(first())
            .subscribe(
                data => {
                    this.uploadFile(file, key, data.data)
                },
                error => {
                    // this.loading = false;
                });

    }

    uploadFile(file: any, key: string, data: any) {
        this.authenticationService.uploadFile(file, key, data).subscribe(event => {
            if (event instanceof HttpResponse) {
                if (event.status === 200 || event.status === 206) {
                    var images = this.form.get(this.question.key).value
                    images.push('/' + key)
                    this.form.controls[this.question.key].setValue(images)
                }
            }
        });
    }
}