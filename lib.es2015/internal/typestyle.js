import * as FreeStyle from "free-style";
import { ensureStringObj, explodeKeyframes } from './formatting';
import { extend, raf } from './utilities';
/**
 * Creates an instance of free style with our options
 */
var createFreeStyle = function () { return FreeStyle.create(
/** Use the default hash function */
undefined, 
/** Preserve $debugName values */
true); };
/**
 * Maintains a single stylesheet and keeps it in sync with requested styles
 */
var TypeStyle = /** @class */ (function () {
    function TypeStyle(_a) {
        var autoGenerateTag = _a.autoGenerateTag;
        var _this = this;
        /**
         * Insert `raw` CSS as a string. This is useful for e.g.
         * - third party CSS that you are customizing with template strings
         * - generating raw CSS in JavaScript
         * - reset libraries like normalize.css that you can use without loaders
         */
        this.cssRaw = function (mustBeValidCSS) {
            if (!mustBeValidCSS) {
                return;
            }
            _this._raw += mustBeValidCSS || '';
            _this._pendingRawChange = true;
            _this._styleUpdated();
        };
        /**
         * Takes CSSProperties and registers it to a global selector (body, html, etc.)
         */
        this.cssRule = function (selector) {
            var objects = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                objects[_i - 1] = arguments[_i];
            }
            var object = ensureStringObj(extend.apply(void 0, objects)).result;
            _this._freeStyle.registerRule(selector, object);
            _this._styleUpdated();
            return;
        };
        /**
         * Renders styles to the singleton tag imediately
         * NOTE: You should only call it on initial render to prevent any non CSS flash.
         * After that it is kept sync using `requestAnimationFrame` and we haven't noticed any bad flashes.
         **/
        this.forceRenderStyles = function () {
            var target = _this._getTag();
            if (!target) {
                return;
            }
            var styles = _this.getStyles();
            target.textContent = styles;
            _this.trigger('render', styles);
        };
        /**
         * Utility function to register an @font-face
         */
        this.fontFace = function () {
            var fontFace = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                fontFace[_i] = arguments[_i];
            }
            var freeStyle = _this._freeStyle;
            for (var _a = 0, _b = fontFace; _a < _b.length; _a++) {
                var face = _b[_a];
                freeStyle.registerRule('@font-face', face);
            }
            _this._styleUpdated();
            return;
        };
        /**
         * Allows use to use the stylesheet in a node.js environment
         */
        this.getStyles = function () {
            return (_this._raw || '') + _this._freeStyle.getStyles();
        };
        /**
         * Takes keyframes and returns a generated animationName
         */
        this.keyframes = function (frames) {
            var _a = explodeKeyframes(frames), keyframes = _a.keyframes, $debugName = _a.$debugName;
            // TODO: replace $debugName with display name
            var animationName = _this._freeStyle.registerKeyframes(keyframes, $debugName);
            _this._styleUpdated();
            return animationName;
        };
        /**
         * Helps with testing. Reinitializes FreeStyle + raw
         */
        this.reinit = function () {
            /** reinit freestyle */
            _this.offAll();
            var freeStyle = createFreeStyle();
            _this._freeStyle = freeStyle;
            _this._lastFreeStyleChangeId = freeStyle.changeId;
            /** reinit raw */
            _this._raw = '';
            _this._pendingRawChange = false;
            /** Clear any styles that were flushed */
            var target = _this._getTag();
            if (target) {
                target.textContent = '';
            }
        };
        /** Sets the target tag where we write the css on style updates */
        this.setStylesTarget = function (tag) {
            /** Clear any data in any previous tag */
            if (_this._tag) {
                _this._tag.textContent = '';
            }
            _this._tag = tag;
            _this.trigger('changeTarget', tag);
            /** This special time buffer immediately */
            _this.forceRenderStyles();
        };
        /**
         * Takes an object where property names are ideal class names and property values are CSSProperties, and
         * returns an object where property names are the same ideal class names and the property values are
         * the actual generated class names using the ideal class name as the $debugName
         */
        this.stylesheet = function (classes) {
            var classNames = Object.getOwnPropertyNames(classes);
            var result = {};
            for (var _i = 0, classNames_1 = classNames; _i < classNames_1.length; _i++) {
                var className = classNames_1[_i];
                var classDef = classes[className];
                if (classDef) {
                    classDef.$debugName = className;
                    result[className] = _this.style(classDef);
                }
            }
            return result;
        };
        this._eventListeners = {};
        var freeStyle = createFreeStyle();
        this._eventListeners = {};
        this._autoGenerateTag = autoGenerateTag;
        this._freeStyle = freeStyle;
        this._lastFreeStyleChangeId = freeStyle.changeId;
        this._pending = 0;
        this._pendingRawChange = false;
        this._raw = '';
        this._tag = undefined;
        // rebind prototype to TypeStyle.  It might be better to do a function() { return this.style.apply(this, arguments)}
        this.style = this.style.bind(this);
        this.on = this.on.bind(this);
        this.once = this.once.bind(this);
        this.off = this.off.bind(this);
        this.offAll = this.offAll.bind(this);
        this.trigger = this.trigger.bind(this);
    }
    /**
     * Only calls cb all sync operations settle
     */
    TypeStyle.prototype._afterAllSync = function (cb) {
        var _this = this;
        this._pending++;
        var pending = this._pending;
        raf(function () {
            if (pending !== _this._pending) {
                return;
            }
            cb();
        });
    };
    TypeStyle.prototype._getTag = function () {
        if (this._tag) {
            return this._tag;
        }
        if (this._autoGenerateTag) {
            var tag = typeof window === 'undefined'
                ? { textContent: '' }
                : document.createElement('style');
            if (typeof document !== 'undefined') {
                document.head.appendChild(tag);
            }
            this._tag = tag;
            return tag;
        }
        return undefined;
    };
    /** Checks if the style tag needs updating and if so queues up the change */
    TypeStyle.prototype._styleUpdated = function () {
        var _this = this;
        var changeId = this._freeStyle.changeId;
        var lastChangeId = this._lastFreeStyleChangeId;
        if (!this._pendingRawChange && changeId === lastChangeId) {
            return;
        }
        this._lastFreeStyleChangeId = changeId;
        this._pendingRawChange = false;
        this._afterAllSync(function () { return _this.forceRenderStyles(); });
        this.trigger('updated');
    };
    TypeStyle.prototype.style = function () {
        var freeStyle = this._freeStyle;
        var _a = ensureStringObj(extend.apply(undefined, arguments)), result = _a.result, debugName = _a.debugName;
        var className = debugName ? freeStyle.registerStyle(result, debugName) : freeStyle.registerStyle(result);
        this._styleUpdated();
        return className;
    };
    TypeStyle.prototype.on = function (eventName, callback, context) {
        if (context === void 0) { context = null; }
        if (Array.isArray(eventName)) {
            for (var _i = 0, eventName_1 = eventName; _i < eventName_1.length; _i++) {
                var _eventName = eventName_1[_i];
                this.on(_eventName, callback, context);
            }
            return;
        }
        var event = { callback: callback, context: context, once: false };
        if (!(eventName in this._eventListeners)) {
            this._eventListeners[eventName] = new Set();
        }
        if (!this._eventListeners[eventName].has(event)) {
            this._eventListeners[eventName].add(event);
        }
    };
    TypeStyle.prototype.once = function (eventName, callback, context) {
        if (context === void 0) { context = null; }
        if (Array.isArray(eventName)) {
            for (var _i = 0, eventName_2 = eventName; _i < eventName_2.length; _i++) {
                var _eventName = eventName_2[_i];
                this.once(_eventName, callback, context);
            }
            return;
        }
        var event = { callback: callback, context: context, once: true };
        if (!(eventName in this._eventListeners)) {
            this._eventListeners[eventName] = new Set();
        }
        if (!this._eventListeners[eventName].has(event)) {
            this._eventListeners[eventName].add(event);
        }
    };
    TypeStyle.prototype.off = function (eventName, callback, context) {
        if (callback === void 0) { callback = null; }
        if (context === void 0) { context = null; }
        if (Array.isArray(eventName)) {
            var result = true;
            for (var _i = 0, eventName_3 = eventName; _i < eventName_3.length; _i++) {
                var _eventName = eventName_3[_i];
                result = result && this.off(_eventName, callback, context);
            }
            return result;
        }
        if (callback) {
            var eventOnce = { callback: callback, context: context, once: true };
            var event_1 = { callback: callback, context: context, once: false };
            var result = false;
            if (eventName in this._eventListeners) {
                if (this._eventListeners[eventName].has(eventOnce)) {
                    this._eventListeners[eventName].delete(eventOnce);
                    result = true;
                }
                if (this._eventListeners[eventName].has(event_1)) {
                    this._eventListeners[eventName].delete(event_1);
                    result = true;
                }
                return result;
            }
            return false;
        }
        else {
            if (eventName in this._eventListeners) {
                delete this._eventListeners[eventName];
                return true;
            }
            return false;
        }
    };
    TypeStyle.prototype.offAll = function () {
        for (var _i = 0, _a = ['updated', 'changeTarget', 'render']; _i < _a.length; _i++) {
            var eventName = _a[_i];
            this.off(eventName);
        }
    };
    TypeStyle.prototype.trigger = function (eventName) {
        var _this = this;
        var eventData = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            eventData[_i - 1] = arguments[_i];
        }
        if (Array.isArray(eventName)) {
            for (var _a = 0, eventName_4 = eventName; _a < eventName_4.length; _a++) {
                var _eventName = eventName_4[_a];
                this.trigger.apply(this, [_eventName].concat(eventData));
            }
            return;
        }
        if (eventName in this._eventListeners) {
            this._eventListeners[eventName].forEach(function (event) {
                if (event.context) {
                    (_a = event.callback).call.apply(_a, [event.context].concat(eventData));
                }
                else {
                    event.callback.apply(event, eventData);
                }
                if (event.once) {
                    _this._eventListeners[eventName].delete(event);
                }
                var _a;
            });
        }
    };
    return TypeStyle;
}());
export { TypeStyle };
