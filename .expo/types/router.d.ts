/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/../screens/app_scholar/Register`; params?: Router.UnknownInputParams; } | { pathname: `/../screens/app_scholar/Homepage`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/../screens/app_scholar/Register`; params?: Router.UnknownOutputParams; } | { pathname: `/../screens/app_scholar/Homepage`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/../screens/app_scholar/Register${`?${string}` | `#${string}` | ''}` | `/../screens/app_scholar/Homepage${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/../screens/app_scholar/Register`; params?: Router.UnknownInputParams; } | { pathname: `/../screens/app_scholar/Homepage`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
    }
  }
}
