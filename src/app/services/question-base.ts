export class QuestionBase<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;

    constructor(options: {
        value?: T,
        key?: string,
        label?: string,
        required?: boolean,
        order?: number,
        controlType?: string
    } = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
    }
}

export class TextboxQuestion extends QuestionBase<string> {
    controlType = 'textbox';
    type: string;
    textarea: boolean = false;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
        this.textarea = options['textarea'] || false;
    }
}

export class RichTextInputQuestion extends QuestionBase<string> {
    controlType = 'richtext';

    constructor(options: {} = {}) {
        super(options);
    }
}

export class DropdownQuestion extends QuestionBase<string> {
    controlType = 'dropdown';
    options: { key: string, value: string }[] = [];
    LOCAL_OPTIONS_KEY: string = ""

    constructor(options: {} = {}) {
        super(options);
        this.LOCAL_OPTIONS_KEY = options['LOCAL_OPTIONS_KEY'] || "";
        this.options = options['options'] || [];
    }
}

export class ImageUploadQuestion extends QuestionBase<string> {
    controlType = 'image_upload';
    multiple: boolean = true
    constructor(options: {} = {}) {
        super(options);
        if (options['multiple'] === false) {
            this.multiple = false;
        }
    }
}

export class ArraySetQuestion extends QuestionBase<string> {
    controlType = 'array_set';
    array: QuestionBase<string>[] = [];

    constructor(options: {} = {}) {
        super(options);
        this.array = options['array'] || [];
    }
}