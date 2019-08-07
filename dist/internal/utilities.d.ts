import * as types from '../types';
export declare const raf: (cb: () => void) => void;
export declare function classes(...classes: (string | false | undefined | null | {
    [className: string]: any;
})[]): string;
export declare function extend(...objects: (types.NestedCSSProperties | undefined | null | false)[]): types.NestedCSSProperties;
export declare const media: (mediaQuery: types.MediaQuery, ...objects: types.NestedCSSProperties[]) => types.NestedCSSProperties;
