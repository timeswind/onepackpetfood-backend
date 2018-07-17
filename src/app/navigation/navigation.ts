import { FuseNavigation } from '@fuse/types';

export const navigationForAdmin: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : '应用',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'tagtrace',
                title    : '标签追踪',
                // translate: 'NAV.TAGTRACE.TITLE',
                type     : 'item',
                icon     : 'email',
                url      : '/tagtrace'
            },
            {
                id       : 'store_management',
                title    : '店铺管理',
                // translate: 'NAV.TAGTRACE.TITLE',
                type     : 'item',
                icon     : 'store',
                url      : '/store_management'
            },
            {
                id       : 'ordertrack',
                title    : '订单追踪',
                // translate: 'NAV.TAGTRACE.TITLE',
                type     : 'item',
                icon     : 'list',
                url      : '/ordertrack'
                // badge    : {
                //     title    : '',
                //     translate: 'NAV.TAGTRACE.BADGE',
                //     bg       : '#F44336',
                //     fg       : '#FFFFFF'
                // }
            },
            {
                id       : 'usersetting',
                title    : '用户设置',
                // translate: 'NAV.TAGTRACE.TITLE',
                type     : 'item',
                icon     : 'settings',
                url      : '/user_setting'
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
        id       : 'applications',
        title    : '应用',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'usersettings',
                title    : '用户设置',
                // translate: 'NAV.TAGTRACE.TITLE',
                type     : 'item',
                icon     : 'settings',
                url      : '/user_setting'
                // badge    : {
                //     title    : '',
                //     translate: 'NAV.TAGTRACE.BADGE',
                //     bg       : '#F44336',
                //     fg       : '#FFFFFF'
                // }
            },
            {
                id       : 'mystore',
                title    : '我的店铺',
                // translate: 'NAV.TAGTRACE.TITLE',
                type     : 'item',
                icon     : 'store',
                url      : '/my_store'
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