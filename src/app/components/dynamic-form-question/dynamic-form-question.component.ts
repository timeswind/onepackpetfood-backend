import { QuestionBase, ArraySetQuestion, ImageUploadQuestion } from '../../services/question-base';
import { Component, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'app/services/authentication.service'
import { NotificationService } from 'app/services/notification.service'
import { first } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { IMAGE_CDN_URL, GOOD_IMAGE_SMALL_SQUARE_SUFFIX } from '../../constants';

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
    selectedPriceSetIndex = 0;
    get isValid() { return this.form.controls[this.question.key].valid; }

    constructor(private authenticationService: AuthenticationService,
        private formBuilder: FormBuilder,
        private notificationService: NotificationService) {

    }

    ngOnInit(): void {

    }

    onImageDrop(event) {
        event.preventDefault();
        var file = event.dataTransfer.files[0]
        if (file.type.indexOf('image') === -1) {
            alert("您拖的不是图片！");
            return false;
        } else {
            const key = 'dropshipping_image/' + new Date().getTime() + file.name
            const pathname = '/' + key
            this.notificationService.subj_notification.next("图片上传中")
            this.authenticationService.getCosUploadSigniture(pathname, 'put')
                .pipe(first())
                .subscribe(
                    data => {
                        this.uploadFile(file, key, data.data)
                    });
        }
    }

    onDragOver(event) {
        event.stopPropagation();
        event.preventDefault();
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
        if (this.question.controlType === 'array_set') {
            console.log(this.form.get(this.question.key)["controls"][0].value)
        }
    }

    removeFormArray(index): void {
        (this.form.get(this.question.key) as FormArray).removeAt(index)
    }

    addImage(path): void {
        if ((this.question as ImageUploadQuestion).multiple) {
            var images = this.form.get(this.question.key).value || []
            images.push(path)
            this.form.controls[this.question.key].setValue(images)
        } else {
            console.log(this.selectedPriceSetIndex)
            const faControl = (<FormArray>this.form.controls[this.question.key]).at(this.selectedPriceSetIndex)
            faControl['controls'].image.setValue(path);
        }
    }

    removeImage(index: number): void {
        if ((this.question as ImageUploadQuestion).multiple) {
            var images = this.form.get(this.question.key).value
            images.splice(index, 1)
            this.form.controls[this.question.key].setValue(images)
        } else {
            console.log(index)
            const faControl = (<FormArray>this.form.controls[this.question.key]).at(index)
            faControl['controls'].image.setValue(null);
        }
    }



    prepareTokenToUploadImage(event): void {
        var file = event.path[0].files[0]
        const key = 'dropshipping_image/' + new Date().getTime() + file.name
        const pathname = '/' + key
        this.notificationService.subj_notification.next("图片上传中")
        this.authenticationService.getCosUploadSigniture(pathname, 'put')
            .pipe(first())
            .subscribe(
                data => {
                    this.uploadFile(file, key, data.data)
                });
    }

    uploadFile(file: any, key: string, data: any) {
        this.authenticationService.uploadFile(file, key, data).subscribe(event => {
            if (event instanceof HttpResponse) {
                if (event.status === 200 || event.status === 206) {
                    this.notificationService.subj_notification.next("图片上传成功")
                    this.addImage('/' + key)
                }
            }
        });
    }
}