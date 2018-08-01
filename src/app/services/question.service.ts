import { Injectable } from '@angular/core';
import { QuestionBase, DropdownQuestion, TextboxQuestion, ImageUploadQuestion, ArraySetQuestion } from './question-base';

@Injectable()
export class QuestionService {
    getNewDropShippingFormQuestions() {
        let questions: QuestionBase<any>[] = [
            new TextboxQuestion({
                key: 'company_name',
                label: '公司名字',
                value: '',
                type: "text",
                required: true,
                order: 1
            }),
            new TextboxQuestion({
                key: 'contact',
                label: '联系方式',
                value: '',
                type: "text",
                required: true,
                order: 2
            }),
            new TextboxQuestion({
                key: 'link',
                label: '商品链接',
                value: '',
                type: "text",
                required: true,
                order: 3
            }),
            new TextboxQuestion({
                key: 'brand_name',
                label: '品牌名字',
                value: '',
                type: "text",
                required: true,
                order: 4
            }),
            new TextboxQuestion({
                key: 'good_name',
                label: '商品名字',
                value: '',
                type: "text",
                required: true,
                order: 5
            }),
            new TextboxQuestion({
                key: 'price',
                label: '价格',
                value: '',
                type: "number",
                required: true,
                order: 7
            }),
            new TextboxQuestion({
                key: 'cost_price',
                label: '成本价',
                value: '',
                type: "number",
                required: true,
                order: 8
            }),
            new ArraySetQuestion({
                key: 'price_sets',
                label: '价格组合',
                value: [],
                array: [
                    new ImageUploadQuestion({
                        key: 'image',
                        label: '图片',
                        value: '',
                        multiple: false,
                        required: false
                    }),
                    new TextboxQuestion({
                        key: 'name',
                        label: '组合名字',
                        value: '',
                        type: "text",
                        required: true
                    }),
                    new TextboxQuestion({
                        key: 'price',
                        label: '价格',
                        value: '',
                        type: "number",
                        required: true
                    }),
                    new TextboxQuestion({
                        key: 'count',
                        label: '数量',
                        value: '',
                        type: "number",
                        required: true
                    })
                ],
                type: "number",
                required: true,
                order: 9
            }),
            new ArraySetQuestion({
                key: 'specifications',
                label: '商品规格',
                value: [],
                array: [
                    new TextboxQuestion({
                        key: 'key',
                        label: '组合名字',
                        value: '',
                        type: "text",
                        required: false
                    }),
                    new TextboxQuestion({
                        key: 'value',
                        label: '价格',
                        value: '',
                        type: "text",
                        required: false
                    }),
                ],
                type: "number",
                required: true,
                order: 9.5
            }),
            new TextboxQuestion({
                key: 'weight',
                label: '重量',
                value: '',
                type: "text",
                required: true,
                order: 10
            }),
            new TextboxQuestion({
                key: 'average_shipping_time',
                label: '平均发货时长',
                value: '',
                type: "text",
                required: true,
                order: 11
            }),
            new TextboxQuestion({
                key: 'shipping_cost',
                label: '邮费',
                value: '',
                type: "number",
                required: true,
                order: 12
            }),
            new TextboxQuestion({
                key: 'seller_credit',
                label: '买家信用',
                value: '',
                type: "text",
                required: true,
                order: 13
            }),
            new ImageUploadQuestion({
                key: 'good_images',
                label: '商品图片',
                value: [],
                required: false,
                order: 14
            }),
            new TextboxQuestion({
                key: 'good_description',
                label: '商品描述',
                value: '',
                type: "text",
                textarea: true,
                required: true,
                order: 15
            }),
            new DropdownQuestion({
                key: 'root_category',
                label: '主类目',
                options: [],
                LOCAL_OPTIONS_KEY: 'ROOT_CATEGORIES_OPTIONS',
                order: 16
            }),
            new DropdownQuestion({
                key: 'category',
                label: '副类目',
                options: [],
                LOCAL_OPTIONS_KEY: 'CHILD_CATEGORIES_OPTIONS',
                order: 17
            }),
        ];

        return questions.sort((a, b) => a.order - b.order);
    }
}