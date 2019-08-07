import { BoxAlignProperty, AlignItemsProperty, GlobalsNumber, JustifyContentProperty, FlexWrapProperty } from 'csstype';
import * as types from '../types';
declare module '../types' {
    interface CSSProperties {
        '-ms-flex-align'?: BoxAlignProperty;
        '-ms-flex-item-align'?: AlignItemsProperty;
        '-ms-flex-wrap'?: FlexWrapProperty;
        '-ms-flex-negative'?: GlobalsNumber;
        '-ms-flex-pack'?: JustifyContentProperty;
    }
}
export declare var flexRoot: types.CSSProperties;
export declare var pass: types.CSSProperties;
export declare var inlineRoot: types.CSSProperties;
export declare const horizontal: types.CSSProperties;
export declare const vertical: types.CSSProperties;
export declare var wrap: types.CSSProperties;
export declare var content: types.CSSProperties;
export declare var flex: types.CSSProperties;
export declare var flex1: types.CSSProperties;
export declare var flex2: types.CSSProperties;
export declare var flex3: types.CSSProperties;
export declare var flex4: types.CSSProperties;
export declare var flex5: types.CSSProperties;
export declare var flex6: types.CSSProperties;
export declare var flex7: types.CSSProperties;
export declare var flex8: types.CSSProperties;
export declare var flex9: types.CSSProperties;
export declare var flex10: types.CSSProperties;
export declare var flex11: types.CSSProperties;
export declare var flex12: types.CSSProperties;
export declare var start: types.CSSProperties;
export declare var center: types.CSSProperties;
export declare var end: types.CSSProperties;
export declare var startJustified: types.CSSProperties;
export declare var centerJustified: types.CSSProperties;
export declare var endJustified: types.CSSProperties;
export declare var aroundJustified: types.CSSProperties;
export declare var betweenJustified: types.CSSProperties;
export declare var centerCenter: types.CSSProperties;
export declare var selfStart: types.CSSProperties;
export declare var selfCenter: types.CSSProperties;
export declare var selfEnd: types.CSSProperties;
export declare var selfStretch: types.CSSProperties;
