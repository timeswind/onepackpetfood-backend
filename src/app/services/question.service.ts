import { Injectable } from '@angular/core';
import { QuestionBase, DropdownQuestion, TextboxQuestion, ImageUploadQuestion } from './question-base';

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
                key: 'good_description',
                label: '商品描述',
                value: '',
                type: "text",
                required: true,
                order: 6
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
                key: 'weight',
                label: '重量',
                value: '',
                type: "text",
                required: true,
                order: 8
            }),
            new TextboxQuestion({
                key: 'average_shipping_time',
                label: '平均发货时长',
                value: '',
                type: "text",
                required: true,
                order: 9
            }),
            new TextboxQuestion({
                key: 'shipping_cost',
                label: '邮费',
                value: '',
                type: "number",
                required: true,
                order: 10
            }),
            new TextboxQuestion({
                key: 'seller_credit',
                label: '买家信用',
                value: '',
                type: "text",
                required: true,
                order: 10
            }),
            new ImageUploadQuestion({
                key: 'good_images',
                label: '图片',
                value: '',
                required: false,
                order: 11
            })
            //   new DropdownQuestion({
            //     key: 'brave',
            //     label: 'Bravery Rating',
            //     options: [
            //       {key: 'solid',  value: 'Solid'},
            //       {key: 'great',  value: 'Great'},
            //       {key: 'good',   value: 'Good'},
            //       {key: 'unproven', value: 'Unproven'}
            //     ],
            //     order: 3
            //   }),
        ];

        return questions.sort((a, b) => a.order - b.order);
    }
}