import { FuseNavigation } from '@fuse/types';

export const navigationForAdmin: FuseNavigation[] = [
    {
        id: 'applications',
        title: '应用',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'tagtrace',
                title: '标签追踪',
                // translate: 'NAV.TAGTRACE.TITLE',
                type: 'item',
                icon: 'email',
                url: '/tagtrace'
            },
            {
                id: 'store_management',
                title: '店铺管理',
                // translate: 'NAV.TAGTRACE.TITLE',
                type: 'item',
                icon: 'store',
                url: '/store_management'
            },
            {
                id: 'ordertrack',
                title: '订单追踪',
                // translate: 'NAV.TAGTRACE.TITLE',
                type: 'item',
                icon: 'list',
                url: '/ordertrack'
                // badge    : {
                //     title    : '',
                //     translate: 'NAV.TAGTRACE.BADGE',
                //     bg       : '#F44336',
                //     fg       : '#FFFFFF'
                // }
            },
            {
                id: 'dropshipping_management',
                title: '一件代发管理',
                // translate: 'NAV.TAGTRACE.TITLE',
                type: 'item',
                icon: 'local_shipping',
                url: '/dropshipping_management'
            },
            {
                id: 'good_management',
                title: '商品管理',
                // translate: 'NAV.TAGTRACE.TITLE',
                type: 'item',
                icon: 'fastfood',
                url: '/good_management'
            },
            {
                id: 'category_management',
                title: '商品类型管理',
                // translate: 'NAV.TAGTRACE.TITLE',
                type: 'item',
                icon: 'category',
                url: '/category_management'
            },
            {
                id: 'usersetting',
                title: '用户设置',
                // translate: 'NAV.TAGTRACE.TITLE',
                type: 'item',
                icon: 'settings',
                url: '/user_setting'
                // badge    : {
                //     title    : '',
                //     translate: 'NAV.TAGTRACE.BADGE',
                //     bg       : '#F44336',
                //     fg       : '#FFFFFF'
                // }
            }
        ]
    }
];


export const navigationForShopOwnerUser: FuseNavigation[] = [
    {
        id: 'applications',
        title: '应用',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'usersettings',
                title: '用户设置',
                // translate: 'NAV.TAGTRACE.TITLE',
                type: 'item',
                icon: 'settings',
                url: '/user_setting'
                // badge    : {
                //     title    : '',
                //     translate: 'NAV.TAGTRACE.BADGE',
                //     bg       : '#F44336',
                //     fg       : '#FFFFFF'
                // }
            },
            {
                id: 'mystore',
                title: '我的店铺',
                // translate: 'NAV.TAGTRACE.TITLE',
                type: 'item',
                icon: 'store',
                url: '/my_store'
                // badge    : {
                //     title    : '',
                //     translate: 'NAV.TAGTRACE.BADGE',
                //     bg       : '#F44336',
                //     fg       : '#FFFFFF'
                // }
            }
        ]
    }
];