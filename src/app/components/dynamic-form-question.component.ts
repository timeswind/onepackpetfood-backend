import { QuestionBase } from '../services/question-base';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
    images = [];
    get isValid() { return this.form.controls[this.question.key].valid; }

    constructor(private authenticationService: AuthenticationService) {

    }

    ngOnInit(): void {

    }

    prepareTokenToUploadImage(event): void {
        console.log(event.path[0].files[0])
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
                console.log('File is completely uploaded!', event);
                if (event.status === 200 || event.status === 206) {
                    this.images.push('/' + key)
                    this.form.controls[this.question.key].setValue(this.images)
                }
            }
        });
    }
}