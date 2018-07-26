import { Injectable } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { QuestionBase, ArraySetQuestion } from './question-base';

@Injectable()
export class QuestionControlService {
    constructor(private formBuilder: FormBuilder) { }

    toFormGroup(questions: QuestionBase<any>[], initialValue = {}) {
        let group: any = {};
        questions.forEach(question => {
            if (question.key in initialValue) {
                question.value = initialValue[question.key]
            }
            if (question.controlType === 'array_set') {
                group[question.key] = this.formBuilder.array(this.initializeFormArray(question))
            } else {
                if (question.required) {
                    group[question.key] = new FormControl(question.value || '', Validators.required)
                } else {
                    group[question.key] = new FormControl(question.value || '')
                }
            }
        });

        return new FormGroup(group);
    }

    private initializeFormArray(questions): FormGroup[] {
        var array = [];
        var keys = []
        let group: any = {};

        questions.array.forEach(question => {
            keys.push(question.key)
            group[question.key] = questions.value
        });

        questions.value.forEach(value => {
            let group: any = {};
            keys.forEach(key => {
                group[key] = value[key]
            })
            array.push(this.formBuilder.group(group))
        });

        return array;
    }
}