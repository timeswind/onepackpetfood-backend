// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    hmr       : false,
    apiUrl: 'api',
    domain: 'xiaoquanju.ap.ngrok.io',
    apiUrlPrefix: 'https://api.xiaoquanjia.com/development/api',
    wechat_miniprogram_url_for_home: 'https://api.xiaoquanjia.com/wechat/miniprogram/home?tagtrack=',
    wechat_miniprogram_url_for_good: 'https://api.xiaoquanjia.com/wechat/miniprogram/good?id='
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
