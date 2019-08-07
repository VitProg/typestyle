import * as FreeStyle from "free-style";
import * as types from '../types';
import { Styles } from "free-style";
import { CSSProperties } from "../types";
export declare type StylesTarget = {
    textContent: string | null;
};
export declare type EventSetItem = {
    callback: (...data: any[]) => void;
    context?: Object | null;
    once?: boolean;
};
export declare type Events = 'updated' | 'changeTarget' | 'render';
export declare class TypeStyle {
    protected _autoGenerateTag: boolean;
    protected _freeStyle: FreeStyle.FreeStyle;
    protected _pending: number;
    protected _pendingRawChange: boolean;
    protected _raw: string;
    protected _tag?: StylesTarget;
    protected _debugNames: boolean;
    protected _lastFreeStyleChangeId: number;
    constructor(config?: {
        autoGenerateTag?: boolean;
        debugNames?: boolean;
    });
    readonly freeStyle: FreeStyle.FreeStyle;
    protected _afterAllSync(cb: () => void): void;
    protected _getTag(): StylesTarget | undefined;
    protected _styleUpdated(): void;
    cssRaw: (mustBeValidCSS: string) => void;
    cssRule: (selector: string, ...objects: types.NestedCSSProperties[]) => void;
    forceRenderStyles: () => void;
    fontFace: (...fontFace: types.FontFace[]) => void;
    getStyles: () => string;
    keyframes: (frames: types.KeyFrames) => string;
    reinit: (debugNames?: boolean | undefined) => void;
    setStylesTarget: (tag: StylesTarget) => void;
    optimize<S extends Styles | CSSProperties>(styles: S): S;
    style(...objects: (types.NestedCSSProperties | undefined)[]): string;
    style(...objects: (types.NestedCSSProperties | null | false | undefined)[]): string;
    stylesheet: <Names extends string = any>(classes: Record<Names, types.NestedCSSProperties>) => Record<Names, string>;
    protected _eventListeners: {
        [eventName: string]: Set<EventSetItem>;
    };
    on(eventName: Events | Events[], callback: (...data: any[]) => void): void;
    on(eventName: Events | Events[], callback: (...data: any[]) => void, context: Object | null): void;
    once(eventName: Events | Events[], callback: (...data: any[]) => void): void;
    once(eventName: Events | Events[], callback: (...data: any[]) => void, context: Object | null): void;
    off(eventName: Events | Events[]): boolean;
    off(eventName: Events | Events[], callback: (...data: any[]) => void, context: Object | null): boolean;
    offAll(): void;
    trigger(eventName: Events, ...eventData: any[]): void;
}
