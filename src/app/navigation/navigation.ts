import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
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
                id       : 'ordertrace',
                title    : '订单追踪',
                // translate: 'NAV.TAGTRACE.TITLE',
                type     : 'item',
                icon     : 'list',
                url      : '/ordertrace'
                // badge    : {
                //     title    : '',
                //     translate: 'NAV.TAGTRACE.BADGE',
                //     bg       : '#F44336',
                //     fg       : '#FFFFFF'
                // }
            },
            {
                id       : 'login',
                title    : '登入',
                // translate: 'NAV.TAGTRACE.TITLE',
                type     : 'item',
                icon     : 'supervised_user_circle',
                url      : '/login'
                // badge    : {
                //     title    : '',
                //     translate: 'NAV.TAGTRACE.BADGE',
                //     bg       : '#F44336',
                //     fg       : '#FFFFFF'
                // }
            },
            {
                id       : 'settings',
                title    : '设置',
                // translate: 'NAV.TAGTRACE.TITLE',
                type     : 'item',
                icon     : 'settings',
                url      : '/settings'
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
