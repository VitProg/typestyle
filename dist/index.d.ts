import { TypeStyle, classes, createTypeStyle, extend, media, types } from './index-base';
export { TypeStyle, classes, createTypeStyle, extend, media, types };
export * from "./types";
export declare const setStylesTarget: (tag: import("./internal/typestyle").StylesTarget) => void;
export declare const cssRaw: (mustBeValidCSS: string) => void;
export declare const cssRule: (selector: string, ...objects: types.NestedCSSProperties[]) => void;
export declare const forceRenderStyles: () => void;
export declare const fontFace: (...fontFace: types.FontFace[]) => void;
export declare const getStyles: () => string;
export declare const keyframes: (frames: types.KeyFrames) => string;
export declare const reinit: (debugNames?: boolean | undefined) => void;
export declare const style: {
    (...objects: (types.NestedCSSProperties | undefined)[]): string;
    (...objects: (false | types.NestedCSSProperties | null | undefined)[]): string;
};
export declare const stylesheet: <Names extends string = any>(classes: Record<Names, types.NestedCSSProperties>) => Record<Names, string>;
export declare const events: {
    on: {
        (eventName: "updated" | "changeTarget" | "render" | import("./internal/typestyle").Events[], callback: (...data: any[]) => void): void;
        (eventName: "updated" | "changeTarget" | "render" | import("./internal/typestyle").Events[], callback: (...data: any[]) => void, context: Object | null): void;
    };
    once: {
        (eventName: "updated" | "changeTarget" | "render" | import("./internal/typestyle").Events[], callback: (...data: any[]) => void): void;
        (eventName: "updated" | "changeTarget" | "render" | import("./internal/typestyle").Events[], callback: (...data: any[]) => void, context: Object | null): void;
    };
    off: {
        (eventName: "updated" | "changeTarget" | "render" | import("./internal/typestyle").Events[]): boolean;
        (eventName: "updated" | "changeTarget" | "render" | import("./internal/typestyle").Events[], callback: (...data: any[]) => void, context: Object | null): boolean;
    };
    trigger: (eventName: import("./internal/typestyle").Events, ...eventData: any[]) => void;
};
export declare const instance: TypeStyle;
export * from './csstips';
