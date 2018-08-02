import { Component, Input, forwardRef, Renderer, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { AuthenticationService } from 'app/services/authentication.service'
import { first } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { IMAGE_CDN_URL, GOOD_DETIAL_DEFAULT_SUFFIX } from '../../constants';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RichTextEdior),
    multi: true
};

@Component({
    selector: 'rich-text-editor',
    templateUrl: './rich-text-editor.component.html',
    styleUrls: ['./rich-text-editor.component.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})

export class RichTextEdior implements ControlValueAccessor {
    IMAGE_CDN_URL = IMAGE_CDN_URL
    GOOD_DETIAL_DEFAULT_SUFFIX = GOOD_DETIAL_DEFAULT_SUFFIX
    @Input() formKey: string;
    @Input() form: FormGroup;
    @ViewChild('uploader') fileInput: ElementRef;
    @ViewChild('editorRef') editorRef: ElementRef;

    quillEditor: any;
    isInForm: boolean;
    editorFullscreen: boolean = false;
    private innerValue: any = '';

    constructor(private authenticationService: AuthenticationService, private renderer: Renderer) {

    }
    //get accessor
    get value(): any {
        return this.innerValue;
    };

    //set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    //Set touched on blur
    onBlur() {
        this.onTouchedCallback();
    }

    //From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
    //Placeholders for the callbacks which are later provided
    //by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    ngOnInit(): void {
        console.log('ngOnInit')
        if (this.form) {
            this.isInForm = true
        }
    }

    contentChanged(event) {
        const html = event.html
        this.form.get(this.formKey).setValue(html)
    }

    getEditorInstance(editorInstance: any) {
        this.quillEditor = editorInstance
        let toolbar = editorInstance.getModule('toolbar');
        toolbar.addHandler('image', this.showImageUI(this.fileInput));
        if (this.isInForm) {
            const html = this.form.get(this.formKey).value
            this.quillEditor.clipboard.dangerouslyPasteHTML(0, html);
            // this.quillEditor.patchValue()
        }
    }

    showImageUI(input) {
        return function () {
            console.log(input.nativeElement.click())
        }
    }

    getUserCursorIndex(): number {
        var range = this.quillEditor.getSelection();
        if (range) {
            if (range.length == 0) {
                return range.index
            } else {
                return range.index
                // var text = quillEditor.getText(range.index, range.length);
                // console.log('User has highlighted: ', text);
            }
        } else {
            return -1
        }
    }

    prepareTokenToUploadImage(event): void {
        var file = event.path[0].files[0]
        const key = 'good_detail_image/' + new Date().getTime() + file.name
        const pathname = '/' + key
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
                    console.log('success')
                    const imagePath = '/' + key
                    const imageUrl = this.IMAGE_CDN_URL + imagePath + '?' + this.GOOD_DETIAL_DEFAULT_SUFFIX
                    const index = this.getUserCursorIndex()
                    this.quillEditor.insertText(index, "\n")
                    this.quillEditor.insertEmbed(index + 1, 'image', imageUrl);
                    // this.addImage('/' + key)
                }
            }
        });
    }

}