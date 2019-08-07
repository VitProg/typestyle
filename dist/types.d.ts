import * as CSS from 'csstype';
export declare type TLength = number | string;
export interface CSSProperties extends CSS.StandardPropertiesFallback<TLength>, CSS.SvgPropertiesFallback<TLength>, CSS.VendorPropertiesHyphenFallback<TLength>, CSS.ObsoletePropertiesFallback<TLength> {
    $unique?: boolean;
}
export interface FontFace extends CSS.FontFace {
}
export declare type CSSClasses<K extends string> = Record<K, NestedCSSProperties>;
export declare type CSSClassNames<K extends string> = Record<K, string>;
export interface NestedCSSProperties extends CSSProperties {
    $nest?: NestedCSSSelectors;
    $debugName?: string;
}
export declare type MediaQuery = {
    type?: 'screen' | 'print' | 'all';
    orientation?: 'landscape' | 'portrait';
    minWidth?: number | string;
    maxWidth?: number | string;
    minHeight?: number | string;
    maxHeight?: number | string;
};
export declare type NestedCSSSelectors = {
    '&:active'?: NestedCSSProperties;
    '&:any'?: NestedCSSProperties;
    '&:checked'?: NestedCSSProperties;
    '&:default'?: NestedCSSProperties;
    '&:disabled'?: NestedCSSProperties;
    '&:empty'?: NestedCSSProperties;
    '&:enabled'?: NestedCSSProperties;
    '&:first'?: NestedCSSProperties;
    '&:first-child'?: NestedCSSProperties;
    '&:first-of-type'?: NestedCSSProperties;
    '&:fullscreen'?: NestedCSSProperties;
    '&:focus'?: NestedCSSProperties;
    '&:hover'?: NestedCSSProperties;
    '&:indeterminate'?: NestedCSSProperties;
    '&:in-range'?: NestedCSSProperties;
    '&:invalid'?: NestedCSSProperties;
    '&:last-child'?: NestedCSSProperties;
    '&:last-of-type'?: NestedCSSProperties;
    '&:left'?: NestedCSSProperties;
    '&:link'?: NestedCSSProperties;
    '&:only-child'?: NestedCSSProperties;
    '&:only-of-type'?: NestedCSSProperties;
    '&:optional'?: NestedCSSProperties;
    '&:out-of-range'?: NestedCSSProperties;
    '&:read-only'?: NestedCSSProperties;
    '&:read-write'?: NestedCSSProperties;
    '&:required'?: NestedCSSProperties;
    '&:right'?: NestedCSSProperties;
    '&:root'?: NestedCSSProperties;
    '&:scope'?: NestedCSSProperties;
    '&:target'?: NestedCSSProperties;
    '&:valid'?: NestedCSSProperties;
    '&:visited'?: NestedCSSProperties;
    '&::after'?: NestedCSSProperties;
    '&::before'?: NestedCSSProperties;
    '&::first-letter'?: NestedCSSProperties;
    '&::first-line'?: NestedCSSProperties;
    '&::selection'?: NestedCSSProperties;
    '&::backdrop'?: NestedCSSProperties;
    '&::placeholder'?: NestedCSSProperties;
    '&::marker'?: NestedCSSProperties;
    '&::spelling-error'?: NestedCSSProperties;
    '&::grammar-error'?: NestedCSSProperties;
    '&>*'?: NestedCSSProperties;
    '@media screen and (min-width: 700px)'?: NestedCSSProperties;
    '@media screen and (max-width: 700px)'?: NestedCSSProperties;
    [selector: string]: NestedCSSProperties | undefined;
};
export interface KeyFrames {
    $debugName?: string;
    [key: string]: CSSProperties | string | undefined;
}
