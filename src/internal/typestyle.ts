import * as FreeStyle from "free-style";
import * as types from '../types';

import { ensureStringObj, explodeKeyframes } from './formatting';
import { extend, raf } from './utilities';
import {Styles} from "free-style";
import {CSSProperties} from "../types";

export type StylesTarget = { textContent: string | null };

/**
 * Creates an instance of free style with our options
 */
const createFreeStyle = (debug: boolean) => FreeStyle.create(
  /** Use the default hash function */
  undefined,
  /** Preserve $debugName values if NODE_ENV is not available (browser) */
  debug,
);

const isProcProduction = () => typeof process !== 'undefined' ? process.env.NODE_ENV === 'production' : false;

export type EventSetItem = { callback: (...data: any[]) => void, context?: Object | null, once?: boolean };
export type Events = 'updated' | 'changeTarget' | 'render';

/**
 * Maintains a single stylesheet and keeps it in sync with requested styles
 */
export class TypeStyle {
  protected _autoGenerateTag: boolean;
  protected _freeStyle: FreeStyle.FreeStyle;
  protected _pending: number;
  protected _pendingRawChange: boolean;
  protected _raw: string;
  protected _tag?: StylesTarget;
  protected _debugNames: boolean;

  /**
   * We have a single stylesheet that we update as components register themselves
   */
  protected _lastFreeStyleChangeId: number;

  constructor(config?: { autoGenerateTag?: boolean, debugNames?: boolean }) {
    this._eventListeners = {};
    this._autoGenerateTag = config ? !!config.autoGenerateTag : true;
    this._debugNames = config && typeof config.debugNames !== 'undefined' ? config.debugNames : !isProcProduction();
    this._pending = 0;
    this._pendingRawChange = false;
    this._raw = '';
    this._tag = undefined;

    const freeStyle = createFreeStyle(this._debugNames);

    this._freeStyle = freeStyle;
    this._lastFreeStyleChangeId = freeStyle.changeId;

    // rebind prototype to TypeStyle.  It might be better to do a function() { return this.style.apply(this, arguments)}
    this.style = this.style.bind(this);
    this.on = this.on.bind(this);
    this.once = this.once.bind(this);
    this.off = this.off.bind(this);
    this.offAll = this.offAll.bind(this);
    this.trigger = this.trigger.bind(this);
  }

  get freeStyle(): FreeStyle.FreeStyle {
    return this._freeStyle;
  }

  /**
   * Only calls cb all sync operations settle
   */
  protected _afterAllSync(cb: () => void): void {
    this._pending++;
    const pending = this._pending;
    raf(() => {
      if (pending !== this._pending) {
        return;
      }
      cb();
    });
  }

  protected _getTag(): StylesTarget | undefined {
    if (this._tag) {
      return this._tag;
    }

    if (this._autoGenerateTag) {
      const tag = typeof window === 'undefined'
        ? { textContent: '' }
        : document.createElement('style');

      if (typeof document !== 'undefined') {
        document.head.appendChild(tag as any);
      }
      this._tag = tag;
      return tag;
    }

    return undefined;
  }

  /** Checks if the style tag needs updating and if so queues up the change */
  protected _styleUpdated(): void {
    const changeId = this._freeStyle.changeId;
    const lastChangeId = this._lastFreeStyleChangeId;

    if (!this._pendingRawChange && changeId === lastChangeId) {
      return;
    }

    this._lastFreeStyleChangeId = changeId;
    this._pendingRawChange = false;

    this._afterAllSync(() => this.forceRenderStyles());

    this.trigger('updated');
  }

  /**
   * Insert `raw` CSS as a string. This is useful for e.g.
   * - third party CSS that you are customizing with template strings
   * - generating raw CSS in JavaScript
   * - reset libraries like normalize.css that you can use without loaders
   */
  public cssRaw = (mustBeValidCSS: string): void => {
    if (!mustBeValidCSS) {
      return;
    }
    this._raw += mustBeValidCSS || '';
    this._pendingRawChange = true;
    this._styleUpdated();
  };

  /**
   * Takes CSSProperties and registers it to a global selector (body, html, etc.)
   */
  public cssRule = (selector: string, ...objects: types.NestedCSSProperties[]): void => {
    const object = ensureStringObj(extend(...objects)).result;
    this._freeStyle.registerRule(selector, object);
    this._styleUpdated();
    return;
  };

  /**
   * Renders styles to the singleton tag imediately
   * NOTE: You should only call it on initial render to prevent any non CSS flash.
   * After that it is kept sync using `requestAnimationFrame` and we haven't noticed any bad flashes.
   **/
  public forceRenderStyles = (): void => {
    const target = this._getTag();
    if (!target) {
      return;
    }
    const styles = this.getStyles();
    target.textContent = styles;
    this.trigger('render', styles);
  };

  /**
   * Utility function to register an @font-face
   */
  public fontFace = (...fontFace: types.FontFace[]): void => {
    const freeStyle = this._freeStyle;
    for (const face of fontFace as FreeStyle.Styles[]) {
      freeStyle.registerRule('@font-face', face);
    }
    this._styleUpdated();
    return;
  };

  /**
   * Allows use to use the stylesheet in a node.js environment
   */
  public getStyles = () => {
    return (this._raw || '') + this._freeStyle.getStyles();
  };

  /**
   * Takes keyframes and returns a generated animationName
   */
  public keyframes = (frames: types.KeyFrames): string => {
    const { keyframes, $debugName } = explodeKeyframes(frames);
    for (const key of Object.keys(keyframes)) {
      const val = keyframes[key];
      if (val && typeof val !== 'string') {
        keyframes[key] = this.optimize(val);
      }
    }
    // TODO: replace $debugName with display name
    const animationName = this._freeStyle.registerKeyframes(keyframes as FreeStyle.Styles, $debugName);
    this._styleUpdated();
    return animationName;
  };

  /**
   * Helps with testing. Reinitializes FreeStyle + raw
   */
  public reinit = (debugNames?: boolean): void => {
    /** reinit freestyle */

    this.offAll();

    this._debugNames = typeof debugNames !== 'undefined' ? debugNames : !isProcProduction();

    const freeStyle = createFreeStyle(this._debugNames);
    this._freeStyle = freeStyle;
    this._lastFreeStyleChangeId = freeStyle.changeId;

    /** reinit raw */
    this._raw = '';
    this._pendingRawChange = false;

    /** Clear any styles that were flushed */
    const target = this._getTag();
    if (target) {
      target.textContent = '';
    }
  };

  /** Sets the target tag where we write the css on style updates */
  public setStylesTarget = (tag: StylesTarget): void => {
    /** Clear any data in any previous tag */
    if (this._tag) {
      this._tag.textContent = '';
    }
    this._tag = tag;
    this.trigger('changeTarget', tag);
    /** This special time buffer immediately */
    this.forceRenderStyles();
  };

  // noinspection JSMethodCanBeStatic
  public optimize<S extends Styles | CSSProperties>(styles: S): S {
    const result = {};

    for (const name of Object.keys(styles)) {
      let value: string | string[] | S = (styles as any)[name];

      if (value !== null && typeof value === 'object' && !Array.isArray(value) && 'hasOwnProperty' in value) {
        value = this.optimize(value);
      }

      switch (name) {
        case 'transform': {
          if (Array.isArray(value) && value) {
            value = value.join('');
            value = value.replace(/,\s+/g, ',');
          }
          break;
        }
      }

      (result as any)[name] = value;
    }

    return result as S;
  }

  /**
   * Takes CSSProperties and return a generated className you can use on your component
   */
  public style(...objects: (types.NestedCSSProperties | undefined)[]): string;
  public style(...objects: (types.NestedCSSProperties | null | false | undefined)[]): string;
  public style() {
    const freeStyle = this._freeStyle;
    const { result, debugName } = ensureStringObj(extend.apply(undefined, arguments));
    const optimized = this.optimize(result as Styles);
    const className = debugName ?
      freeStyle.registerStyle(optimized, debugName) :
      freeStyle.registerStyle(optimized);
    this._styleUpdated();
    return className;
  }

  /**
   * Takes an object where property names are ideal class names and property values are CSSProperties, and
   * returns an object where property names are the same ideal class names and the property values are
   * the actual generated class names using the ideal class name as the $debugName
   */
  public stylesheet = <Names extends string = any>(classes: types.CSSClasses<Names>): types.CSSClassNames<Names> => {
    const classNames = Object.getOwnPropertyNames(classes) as (Names)[];
    const result = {} as types.CSSClassNames<Names>;
    for (let className of classNames) {
      const classDef = classes[className] as types.NestedCSSProperties;
      if (classDef) {
        classDef.$debugName = className;
        result[className] = this.style(classDef);
      }
    }
    return result;
  };

  protected _eventListeners: {[eventName: string]: Set<EventSetItem>} = {};

  public on(eventName: Events | Events[], callback: (...data: any[]) => void): void;
  public on(eventName: Events | Events[], callback: (...data: any[]) => void, context: Object | null): void;
  public on(eventName: Events | Events[], callback: (...data: any[]) => void, context: Object | null = null): void {
    if (Array.isArray(eventName)) {
      for(const _eventName of eventName) {
        this.on(_eventName, callback, context);
      }
      return;
    }

    const event: EventSetItem = {callback, context, once: false};

    if (!(eventName in this._eventListeners)) {
      this._eventListeners[eventName] = new Set<EventSetItem>();
    }

    if (!this._eventListeners[eventName].has(event)) {
      this._eventListeners[eventName].add(event);
    }
  }

  public once(eventName: Events | Events[], callback: (...data: any[]) => void): void;
  public once(eventName: Events | Events[], callback: (...data: any[]) => void, context: Object | null): void;
  public once(eventName: Events | Events[], callback: (...data: any[]) => void, context: Object | null = null): void {
    if (Array.isArray(eventName)) {
      for(const _eventName of eventName) {
        this.once(_eventName, callback, context);
      }
      return;
    }

    const event: EventSetItem = {callback, context, once: true};

    if (!(eventName in this._eventListeners)) {
      this._eventListeners[eventName] = new Set<EventSetItem>();
    }

    if (!this._eventListeners[eventName].has(event)) {
      this._eventListeners[eventName].add(event);
    }
  }

  public off(eventName: Events | Events[]): boolean;
  public off(eventName: Events | Events[], callback: (...data: any[]) => void, context: Object | null): boolean;
  public off(eventName: Events | Events[], callback: any = null, context: Object | null = null): boolean {
    if (Array.isArray(eventName)) {
      let result = true;
      for(const _eventName of eventName) {
        result = result && this.off(_eventName, callback, context);
      }
      return result;
    }

    if (callback) {
      const eventOnce: EventSetItem = {callback, context, once: true};
      const event: EventSetItem = {callback, context, once: false};

      let result = false;
      if (eventName in this._eventListeners) {
        if (this._eventListeners[eventName].has(eventOnce)) {
          this._eventListeners[eventName].delete(eventOnce);
          result = true;
        }

        if (this._eventListeners[eventName].has(event)) {
          this._eventListeners[eventName].delete(event);
          result = true;
        }

        return result;
      }

      return false;
    } else {
      if (eventName in this._eventListeners) {
        delete this._eventListeners[eventName];
        return true;
      }
      return false;
    }
  }

  public offAll() {
    for(const eventName of ['updated', 'changeTarget', 'render'] as Events[]) {
      this.off(eventName);
    }
  }

  public trigger(eventName: Events, ...eventData: any[]) {
    if (Array.isArray(eventName)) {
      for(const _eventName of eventName) {
        this.trigger(_eventName, ...eventData);
      }
      return;
    }

    if (eventName in this._eventListeners) {
      this._eventListeners[eventName].forEach((event) => {
        if (event.context) {
          event.callback.call(event.context, ...eventData);
        } else {
          event.callback(...eventData);
        }
        if (event.once) {
          this._eventListeners[eventName].delete(event);
        }
      });
    }
  }
}

