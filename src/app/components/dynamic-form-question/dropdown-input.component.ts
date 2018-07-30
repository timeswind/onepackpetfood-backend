import { DropdownQuestion } from '../../services/question-base';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppState } from '../../app.state';
import { Store, select } from '@ngrx/store';
import { selectEssentialDataRootCategories, selectEssentialDataChildCategoriesCollection } from '../../reducers/essential_data.reducer';

@Component({
    selector: 'dynamic-question-dropdown-input',
    templateUrl: './dropdown-input.component.html',
    styleUrls: ['./dynamic-form-question.component.scss']
})

export class DynamicFormQuestionDropdownInputComponent {
    @Input() optionsKey: string;
    @Input() question: DropdownQuestion;
    @Input() form: FormGroup;
    hasLocalOptionsKey: boolean = false;
    constructor(private store: Store<AppState>) { }

    get isValid() { return this.form.controls[this.question.key].valid; }

    ngOnInit(): void {
        if (this.question.LOCAL_OPTIONS_KEY) {
            this.hasLocalOptionsKey = true;
            if (this.question.LOCAL_OPTIONS_KEY === "ROOT_CATEGORIES_OPTIONS") {
                console.log(this.form.get('root_category').value)
                this.store.pipe(select(selectEssentialDataRootCategories)).subscribe(data => {
                    const mdata = data.map((category) => {
                        return { key: category._id, value: category.name }
                    })
                    this.question.options = mdata
                })
            } else if (this.question.LOCAL_OPTIONS_KEY === "CHILD_CATEGORIES_OPTIONS") {
                if ('root_category' in this.form.value && this.form.value.root_category) {
                    this.store.pipe(select(selectEssentialDataChildCategoriesCollection)).subscribe(data => {
                        const mdata = data[this.form.value.root_category].map((category) => {
                            return { key: category._id, value: category.name }
                        })
                        this.question.options = mdata
                    })
                }

                this.form.get("root_category").valueChanges.subscribe(key => {
                    this.store.pipe(select(selectEssentialDataChildCategoriesCollection)).subscribe(data => {
                        const mdata = data[key].map((category) => {
                            return { key: category._id, value: category.name }
                        })
                        this.question.options = mdata
                    })
                })
            }
        }
    }
}