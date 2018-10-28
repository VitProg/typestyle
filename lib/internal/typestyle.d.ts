import * as FreeStyle from "free-style";
import * as types from '../types';
export declare type StylesTarget = {
    textContent: string | null;
};
export declare type EventSetItem = {
    callback: (...data: any[]) => void;
    context?: Object | null;
    once?: boolean;
};
export declare type Events = 'updated' | 'changeTarget' | 'render';
/**
 * Maintains a single stylesheet and keeps it in sync with requested styles
 */
export declare class TypeStyle {
    protected _autoGenerateTag: boolean;
    protected _freeStyle: FreeStyle.FreeStyle;
    protected _pending: number;
    protected _pendingRawChange: boolean;
    protected _raw: string;
    protected _tag?: StylesTarget;
    /**
     * We have a single stylesheet that we update as components register themselves
     */
    protected _lastFreeStyleChangeId: number;
    constructor({autoGenerateTag}: {
        autoGenerateTag: boolean;
    });
    /**
     * Only calls cb all sync operations settle
     */
    protected _afterAllSync(cb: () => void): void;
    protected _getTag(): StylesTarget | undefined;
    /** Checks if the style tag needs updating and if so queues up the change */
    protected _styleUpdated(): void;
    /**
     * Insert `raw` CSS as a string. This is useful for e.g.
     * - third party CSS that you are customizing with template strings
     * - generating raw CSS in JavaScript
     * - reset libraries like normalize.css that you can use without loaders
     */
    cssRaw: (mustBeValidCSS: string) => void;
    /**
     * Takes CSSProperties and registers it to a global selector (body, html, etc.)
     */
    cssRule: (selector: string, ...objects: types.NestedCSSProperties[]) => void;
    /**
     * Renders styles to the singleton tag imediately
     * NOTE: You should only call it on initial render to prevent any non CSS flash.
     * After that it is kept sync using `requestAnimationFrame` and we haven't noticed any bad flashes.
     **/
    forceRenderStyles: () => void;
    /**
     * Utility function to register an @font-face
     */
    fontFace: (...fontFace: types.FontFace[]) => void;
    /**
     * Allows use to use the stylesheet in a node.js environment
     */
    getStyles: () => string;
    /**
     * Takes keyframes and returns a generated animationName
     */
    keyframes: (frames: types.KeyFrames) => string;
    /**
     * Helps with testing. Reinitializes FreeStyle + raw
     */
    reinit: () => void;
    /** Sets the target tag where we write the css on style updates */
    setStylesTarget: (tag: StylesTarget) => void;
    /**
     * Takes CSSProperties and return a generated className you can use on your component
     */
    style(...objects: (types.NestedCSSProperties | undefined)[]): string;
    style(...objects: (types.NestedCSSProperties | null | false | undefined)[]): string;
    /**
     * Takes an object where property names are ideal class names and property values are CSSProperties, and
     * returns an object where property names are the same ideal class names and the property values are
     * the actual generated class names using the ideal class name as the $debugName
     */
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
