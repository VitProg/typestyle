(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === "object" && typeof module === "object") module.exports = factory(); else if (typeof define === "function" && define.amd) define([], factory); else if (typeof exports === "object") exports["typestyle"] = factory(); else root["typestyle"] = factory();
})(window, function() {
    return function(modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) {
                return installedModules[moduleId].exports;
            }
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: false,
                exports: {}
            };
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.l = true;
            return module.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.d = function(exports, name, getter) {
            if (!__webpack_require__.o(exports, name)) {
                Object.defineProperty(exports, name, {
                    enumerable: true,
                    get: getter
                });
            }
        };
        __webpack_require__.r = function(exports) {
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                Object.defineProperty(exports, Symbol.toStringTag, {
                    value: "Module"
                });
            }
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
        };
        __webpack_require__.t = function(value, mode) {
            if (mode & 1) value = __webpack_require__(value);
            if (mode & 8) return value;
            if (mode & 4 && typeof value === "object" && value && value.__esModule) return value;
            var ns = Object.create(null);
            __webpack_require__.r(ns);
            Object.defineProperty(ns, "default", {
                enumerable: true,
                value: value
            });
            if (mode & 2 && typeof value != "string") for (var key in value) __webpack_require__.d(ns, key, function(key) {
                return value[key];
            }.bind(null, key));
            return ns;
        };
        __webpack_require__.n = function(module) {
            var getter = module && module.__esModule ? function getDefault() {
                return module["default"];
            } : function getModuleExports() {
                return module;
            };
            __webpack_require__.d(getter, "a", getter);
            return getter;
        };
        __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        __webpack_require__.p = "/";
        return __webpack_require__(__webpack_require__.s = 6);
    }([ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "d", function() {
            return raf;
        });
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return classes;
        });
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return extend;
        });
        __webpack_require__.d(__webpack_exports__, "c", function() {
            return media;
        });
        const raf = typeof requestAnimationFrame === "undefined" ? cb => setTimeout(cb) : typeof window === "undefined" ? requestAnimationFrame : requestAnimationFrame.bind(window);
        function classes(...classes) {
            return classes.map(c => c && typeof c === "object" ? Object.keys(c).map(key => !!c[key] && key) : [ c ]).reduce((flattened, c) => flattened.concat(c), []).filter(c => !!c).join(" ");
        }
        function extend(...objects) {
            const result = {};
            for (const object of objects) {
                if (object == null || object === false) {
                    continue;
                }
                for (const key in object) {
                    const val = object[key];
                    if (!val && val !== 0) {
                        continue;
                    }
                    if (key === "$nest" && val) {
                        result[key] = result["$nest"] ? extend(result["$nest"], val) : val;
                    } else if (key.indexOf("&") !== -1 || key.indexOf("@media") === 0) {
                        result[key] = result[key] ? extend(result[key], val) : val;
                    } else {
                        result[key] = val;
                    }
                }
            }
            return result;
        }
        const media = (mediaQuery, ...objects) => {
            const mediaQuerySections = [];
            if (mediaQuery.type) mediaQuerySections.push(mediaQuery.type);
            if (mediaQuery.orientation) mediaQuerySections.push(`(orientation: ${mediaQuery.orientation})`);
            if (mediaQuery.minWidth) mediaQuerySections.push(`(min-width: ${mediaLength(mediaQuery.minWidth)})`);
            if (mediaQuery.maxWidth) mediaQuerySections.push(`(max-width: ${mediaLength(mediaQuery.maxWidth)})`);
            if (mediaQuery.minHeight) mediaQuerySections.push(`(min-height: ${mediaLength(mediaQuery.minHeight)})`);
            if (mediaQuery.maxHeight) mediaQuerySections.push(`(max-height: ${mediaLength(mediaQuery.maxHeight)})`);
            const stringMediaQuery = `@media ${mediaQuerySections.join(" and ")}`;
            const object = {
                $nest: {
                    [stringMediaQuery]: extend(...objects)
                }
            };
            return object;
        };
        const mediaLength = value => typeof value === "string" ? value : `${value}px`;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        (function(process) {
            var __extends = this && this.__extends || function() {
                var extendStatics = function(d, b) {
                    extendStatics = Object.setPrototypeOf || {
                        __proto__: []
                    } instanceof Array && function(d, b) {
                        d.__proto__ = b;
                    } || function(d, b) {
                        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                    };
                    return extendStatics(d, b);
                };
                return function(d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var uniqueId = 0;
            exports.IS_UNIQUE = "__DO_NOT_DEDUPE_STYLE__";
            var upperCasePattern = /[A-Z]/g;
            var msPattern = /^ms-/;
            var interpolatePattern = /&/g;
            var escapePattern = /[ !#$%&()*+,.\/;<=>?@[\]^`{|}~"'\\]/g;
            var propLower = function(m) {
                return "-" + m.toLowerCase();
            };
            var CSS_NUMBER = {
                "animation-iteration-count": true,
                "border-image-outset": true,
                "border-image-slice": true,
                "border-image-width": true,
                "box-flex": true,
                "box-flex-group": true,
                "box-ordinal-group": true,
                "column-count": true,
                columns: true,
                "counter-increment": true,
                "counter-reset": true,
                flex: true,
                "flex-grow": true,
                "flex-positive": true,
                "flex-shrink": true,
                "flex-negative": true,
                "flex-order": true,
                "font-weight": true,
                "grid-area": true,
                "grid-column": true,
                "grid-column-end": true,
                "grid-column-span": true,
                "grid-column-start": true,
                "grid-row": true,
                "grid-row-end": true,
                "grid-row-span": true,
                "grid-row-start": true,
                "line-clamp": true,
                "line-height": true,
                opacity: true,
                order: true,
                orphans: true,
                "tab-size": true,
                widows: true,
                "z-index": true,
                zoom: true,
                "fill-opacity": true,
                "flood-opacity": true,
                "stop-opacity": true,
                "stroke-dasharray": true,
                "stroke-dashoffset": true,
                "stroke-miterlimit": true,
                "stroke-opacity": true,
                "stroke-width": true
            };
            for (var _i = 0, _a = Object.keys(CSS_NUMBER); _i < _a.length; _i++) {
                var property = _a[_i];
                for (var _b = 0, _c = [ "-webkit-", "-ms-", "-moz-", "-o-", "" ]; _b < _c.length; _b++) {
                    var prefix = _c[_b];
                    CSS_NUMBER[prefix + property] = true;
                }
            }
            exports.escape = function(str) {
                return str.replace(escapePattern, "\\$&");
            };
            function hyphenate(propertyName) {
                return propertyName.replace(upperCasePattern, propLower).replace(msPattern, "-ms-");
            }
            exports.hyphenate = hyphenate;
            function stringHash(str) {
                var value = 5381;
                var len = str.length;
                while (len--) value = value * 33 ^ str.charCodeAt(len);
                return (value >>> 0).toString(36);
            }
            exports.stringHash = stringHash;
            function styleToString(key, value) {
                if (typeof value === "number" && value !== 0 && !CSS_NUMBER.hasOwnProperty(key)) {
                    return key + ":" + value + "px";
                }
                return key + ":" + value;
            }
            function sortTuples(value) {
                return value.sort(function(a, b) {
                    return a[0] > b[0] ? 1 : -1;
                });
            }
            function parseStyles(styles, hasNestedStyles) {
                var properties = [];
                var nestedStyles = [];
                var isUnique = false;
                for (var _i = 0, _a = Object.keys(styles); _i < _a.length; _i++) {
                    var key = _a[_i];
                    var value = styles[key];
                    if (value !== null && value !== undefined) {
                        if (key === exports.IS_UNIQUE) {
                            isUnique = true;
                        } else if (typeof value === "object" && !Array.isArray(value)) {
                            nestedStyles.push([ key.trim(), value ]);
                        } else {
                            properties.push([ hyphenate(key.trim()), value ]);
                        }
                    }
                }
                return {
                    style: stringifyProperties(sortTuples(properties)),
                    nested: hasNestedStyles ? nestedStyles : sortTuples(nestedStyles),
                    isUnique: isUnique
                };
            }
            function stringifyProperties(properties) {
                return properties.map(function(_a) {
                    var name = _a[0], value = _a[1];
                    if (!Array.isArray(value)) return styleToString(name, value);
                    return value.map(function(x) {
                        return styleToString(name, x);
                    }).join(";");
                }).join(";");
            }
            function interpolate(selector, parent) {
                if (selector.indexOf("&") === -1) return parent + " " + selector;
                return selector.replace(interpolatePattern, parent);
            }
            function stylize(selector, styles, rulesList, stylesList, parent) {
                var _a = parseStyles(styles, selector !== ""), style = _a.style, nested = _a.nested, isUnique = _a.isUnique;
                var pid = style;
                if (selector.charCodeAt(0) === 64) {
                    var child = {
                        selector: selector,
                        styles: [],
                        rules: [],
                        style: parent ? "" : style
                    };
                    rulesList.push(child);
                    if (style && parent) child.styles.push({
                        selector: parent,
                        style: style,
                        isUnique: isUnique
                    });
                    for (var _i = 0, nested_1 = nested; _i < nested_1.length; _i++) {
                        var _b = nested_1[_i], name = _b[0], value = _b[1];
                        pid += name + stylize(name, value, child.rules, child.styles, parent);
                    }
                } else {
                    var key = parent ? interpolate(selector, parent) : selector;
                    if (style) stylesList.push({
                        selector: key,
                        style: style,
                        isUnique: isUnique
                    });
                    for (var _c = 0, nested_2 = nested; _c < nested_2.length; _c++) {
                        var _d = nested_2[_c], name = _d[0], value = _d[1];
                        pid += name + stylize(name, value, rulesList, stylesList, key);
                    }
                }
                return pid;
            }
            function composeStylize(cache, pid, rulesList, stylesList, className, isStyle) {
                for (var _i = 0, stylesList_1 = stylesList; _i < stylesList_1.length; _i++) {
                    var _a = stylesList_1[_i], selector = _a.selector, style = _a.style, isUnique = _a.isUnique;
                    var key = isStyle ? interpolate(selector, className) : selector;
                    var id = isUnique ? "u\0" + (++uniqueId).toString(36) : "s\0" + pid + "\0" + style;
                    var item = new Style(style, id);
                    item.add(new Selector(key, "k\0" + pid + "\0" + key));
                    cache.add(item);
                }
                for (var _b = 0, rulesList_1 = rulesList; _b < rulesList_1.length; _b++) {
                    var _c = rulesList_1[_b], selector = _c.selector, style = _c.style, rules = _c.rules, styles = _c.styles;
                    var item = new Rule(selector, style, "r\0" + pid + "\0" + selector + "\0" + style);
                    composeStylize(item, pid, rules, styles, className, isStyle);
                    cache.add(item);
                }
            }
            function join(arr) {
                var res = "";
                for (var i = 0; i < arr.length; i++) res += arr[i];
                return res;
            }
            var noopChanges = {
                add: function() {
                    return undefined;
                },
                change: function() {
                    return undefined;
                },
                remove: function() {
                    return undefined;
                }
            };
            var Cache = function() {
                function Cache(changes) {
                    if (changes === void 0) {
                        changes = noopChanges;
                    }
                    this.changes = changes;
                    this.sheet = [];
                    this.changeId = 0;
                    this._keys = [];
                    this._children = Object.create(null);
                    this._counters = Object.create(null);
                }
                Cache.prototype.add = function(style) {
                    var count = this._counters[style.id] || 0;
                    var item = this._children[style.id] || style.clone();
                    this._counters[style.id] = count + 1;
                    if (count === 0) {
                        this._children[item.id] = item;
                        this._keys.push(item.id);
                        this.sheet.push(item.getStyles());
                        this.changeId++;
                        this.changes.add(item, this._keys.length - 1);
                    } else if (item instanceof Cache && style instanceof Cache) {
                        var curIndex = this._keys.indexOf(style.id);
                        var prevItemChangeId = item.changeId;
                        item.merge(style);
                        if (item.changeId !== prevItemChangeId) {
                            this.sheet.splice(curIndex, 1, item.getStyles());
                            this.changeId++;
                            this.changes.change(item, curIndex, curIndex);
                        }
                    }
                    return item;
                };
                Cache.prototype.remove = function(style) {
                    var count = this._counters[style.id];
                    if (count !== undefined && count > 0) {
                        this._counters[style.id] = count - 1;
                        var item = this._children[style.id];
                        var index = this._keys.indexOf(item.id);
                        if (count === 1) {
                            delete this._counters[style.id];
                            delete this._children[style.id];
                            this._keys.splice(index, 1);
                            this.sheet.splice(index, 1);
                            this.changeId++;
                            this.changes.remove(item, index);
                        } else if (item instanceof Cache && style instanceof Cache) {
                            var prevChangeId = item.changeId;
                            item.unmerge(style);
                            if (item.changeId !== prevChangeId) {
                                this.sheet.splice(index, 1, item.getStyles());
                                this.changeId++;
                                this.changes.change(item, index, index);
                            }
                        }
                    }
                };
                Cache.prototype.values = function() {
                    var _this = this;
                    return this._keys.map(function(key) {
                        return _this._children[key];
                    });
                };
                Cache.prototype.merge = function(cache) {
                    for (var _i = 0, _a = cache.values(); _i < _a.length; _i++) {
                        var item = _a[_i];
                        this.add(item);
                    }
                    return this;
                };
                Cache.prototype.unmerge = function(cache) {
                    for (var _i = 0, _a = cache.values(); _i < _a.length; _i++) {
                        var item = _a[_i];
                        this.remove(item);
                    }
                    return this;
                };
                Cache.prototype.clone = function() {
                    return new Cache().merge(this);
                };
                return Cache;
            }();
            exports.Cache = Cache;
            var Selector = function() {
                function Selector(selector, id) {
                    this.selector = selector;
                    this.id = id;
                }
                Selector.prototype.getStyles = function() {
                    return this.selector;
                };
                Selector.prototype.clone = function() {
                    return new Selector(this.selector, this.id);
                };
                return Selector;
            }();
            exports.Selector = Selector;
            var Style = function(_super) {
                __extends(Style, _super);
                function Style(style, id) {
                    var _this = _super.call(this) || this;
                    _this.style = style;
                    _this.id = id;
                    return _this;
                }
                Style.prototype.getStyles = function() {
                    return this.sheet.join(",") + "{" + this.style + "}";
                };
                Style.prototype.clone = function() {
                    return new Style(this.style, this.id).merge(this);
                };
                return Style;
            }(Cache);
            exports.Style = Style;
            var Rule = function(_super) {
                __extends(Rule, _super);
                function Rule(rule, style, id) {
                    var _this = _super.call(this) || this;
                    _this.rule = rule;
                    _this.style = style;
                    _this.id = id;
                    return _this;
                }
                Rule.prototype.getStyles = function() {
                    return this.rule + "{" + this.style + join(this.sheet) + "}";
                };
                Rule.prototype.clone = function() {
                    return new Rule(this.rule, this.style, this.id).merge(this);
                };
                return Rule;
            }(Cache);
            exports.Rule = Rule;
            var FreeStyle = function(_super) {
                __extends(FreeStyle, _super);
                function FreeStyle(hash, debug, id, changes) {
                    var _this = _super.call(this, changes) || this;
                    _this.hash = hash;
                    _this.debug = debug;
                    _this.id = id;
                    return _this;
                }
                FreeStyle.prototype.registerStyle = function(styles, displayName) {
                    var rulesList = [];
                    var stylesList = [];
                    var pid = stylize("&", styles, rulesList, stylesList);
                    var hash = "f" + this.hash(pid);
                    var id = this.debug && displayName ? displayName + "_" + hash : hash;
                    composeStylize(this, pid, rulesList, stylesList, "." + exports.escape(id), true);
                    return id;
                };
                FreeStyle.prototype.registerKeyframes = function(keyframes, displayName) {
                    return this.registerHashRule("@keyframes", keyframes, displayName);
                };
                FreeStyle.prototype.registerHashRule = function(prefix, styles, displayName) {
                    var rulesList = [];
                    var stylesList = [];
                    var pid = stylize("", styles, rulesList, stylesList);
                    var hash = "f" + this.hash(pid);
                    var id = this.debug && displayName ? displayName + "_" + hash : hash;
                    var rule = new Rule(prefix + " " + exports.escape(id), "", "h\0" + pid + "\0" + prefix);
                    composeStylize(rule, pid, rulesList, stylesList, "", false);
                    this.add(rule);
                    return id;
                };
                FreeStyle.prototype.registerRule = function(rule, styles) {
                    var rulesList = [];
                    var stylesList = [];
                    var pid = stylize(rule, styles, rulesList, stylesList);
                    composeStylize(this, pid, rulesList, stylesList, "", false);
                };
                FreeStyle.prototype.registerCss = function(styles) {
                    return this.registerRule("", styles);
                };
                FreeStyle.prototype.getStyles = function() {
                    return join(this.sheet);
                };
                FreeStyle.prototype.clone = function() {
                    return new FreeStyle(this.hash, this.debug, this.id, this.changes).merge(this);
                };
                return FreeStyle;
            }(Cache);
            exports.FreeStyle = FreeStyle;
            function create(hash, debug, changes) {
                if (hash === void 0) {
                    hash = stringHash;
                }
                if (debug === void 0) {
                    debug = typeof process !== "undefined" && "production" !== "production";
                }
                if (changes === void 0) {
                    changes = noopChanges;
                }
                return new FreeStyle(hash, debug, "f" + (++uniqueId).toString(36), changes);
            }
            exports.create = create;
        }).call(this, __webpack_require__(4));
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return ensureStringObj;
        });
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return explodeKeyframes;
        });
        var free_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
        var free_style__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(free_style__WEBPACK_IMPORTED_MODULE_0__);
        function ensureStringObj(object) {
            const result = {};
            let debugName = "";
            for (const key in object) {
                const val = object[key];
                if (key === "$unique") {
                    result[free_style__WEBPACK_IMPORTED_MODULE_0__["IS_UNIQUE"]] = val;
                } else if (key === "$nest") {
                    const nested = val;
                    for (let selector in nested) {
                        const subproperties = nested[selector];
                        result[selector] = ensureStringObj(subproperties).result;
                    }
                } else if (key === "$debugName") {
                    debugName = val;
                } else {
                    result[key] = val;
                }
            }
            return {
                result: result,
                debugName: debugName
            };
        }
        function explodeKeyframes(frames) {
            const result = {
                $debugName: undefined,
                keyframes: {}
            };
            for (const offset in frames) {
                const val = frames[offset];
                if (offset === "$debugName") {
                    result.$debugName = val;
                } else {
                    result.keyframes[offset] = val;
                }
            }
            return result;
        }
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        (function(process) {
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return TypeStyle;
            });
            var free_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
            var free_style__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(free_style__WEBPACK_IMPORTED_MODULE_0__);
            var _formatting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
            var _utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
            const createFreeStyle = debug => free_style__WEBPACK_IMPORTED_MODULE_0__["create"](undefined, debug);
            const isProcProduction = () => typeof process !== "undefined" ? "production" === "production" : false;
            class TypeStyle {
                constructor(config) {
                    this.cssRaw = mustBeValidCSS => {
                        if (!mustBeValidCSS) {
                            return;
                        }
                        this._raw += mustBeValidCSS || "";
                        this._pendingRawChange = true;
                        this._styleUpdated();
                    };
                    this.cssRule = (selector, ...objects) => {
                        const object = Object(_formatting__WEBPACK_IMPORTED_MODULE_1__["a"])(Object(_utilities__WEBPACK_IMPORTED_MODULE_2__["b"])(...objects)).result;
                        this._freeStyle.registerRule(selector, object);
                        this._styleUpdated();
                        return;
                    };
                    this.forceRenderStyles = () => {
                        const target = this._getTag();
                        if (!target) {
                            return;
                        }
                        const styles = this.getStyles();
                        target.textContent = styles;
                        this.trigger("render", styles);
                    };
                    this.fontFace = (...fontFace) => {
                        const freeStyle = this._freeStyle;
                        for (const face of fontFace) {
                            freeStyle.registerRule("@font-face", face);
                        }
                        this._styleUpdated();
                        return;
                    };
                    this.getStyles = () => {
                        return (this._raw || "") + this._freeStyle.getStyles();
                    };
                    this.keyframes = frames => {
                        const {keyframes: keyframes, $debugName: $debugName} = Object(_formatting__WEBPACK_IMPORTED_MODULE_1__["b"])(frames);
                        for (const key of Object.keys(keyframes)) {
                            const val = keyframes[key];
                            if (val && typeof val !== "string") {
                                keyframes[key] = this.optimize(val);
                            }
                        }
                        const animationName = this._freeStyle.registerKeyframes(keyframes, $debugName);
                        this._styleUpdated();
                        return animationName;
                    };
                    this.reinit = debugNames => {
                        this.offAll();
                        this._debugNames = typeof debugNames !== "undefined" ? debugNames : !isProcProduction();
                        const freeStyle = createFreeStyle(this._debugNames);
                        this._freeStyle = freeStyle;
                        this._lastFreeStyleChangeId = freeStyle.changeId;
                        this._raw = "";
                        this._pendingRawChange = false;
                        const target = this._getTag();
                        if (target) {
                            target.textContent = "";
                        }
                    };
                    this.setStylesTarget = tag => {
                        if (this._tag) {
                            this._tag.textContent = "";
                        }
                        this._tag = tag;
                        this.trigger("changeTarget", tag);
                        this.forceRenderStyles();
                    };
                    this.stylesheet = classes => {
                        const classNames = Object.getOwnPropertyNames(classes);
                        const result = {};
                        for (let className of classNames) {
                            const classDef = classes[className];
                            if (classDef) {
                                classDef.$debugName = className;
                                result[className] = this.style(classDef);
                            }
                        }
                        return result;
                    };
                    this._eventListeners = {};
                    this._eventListeners = {};
                    this._autoGenerateTag = config ? !!config.autoGenerateTag : true;
                    this._debugNames = config && typeof config.debugNames !== "undefined" ? config.debugNames : !isProcProduction();
                    this._pending = 0;
                    this._pendingRawChange = false;
                    this._raw = "";
                    this._tag = undefined;
                    const freeStyle = createFreeStyle(this._debugNames);
                    this._freeStyle = freeStyle;
                    this._lastFreeStyleChangeId = freeStyle.changeId;
                    this.style = this.style.bind(this);
                    this.on = this.on.bind(this);
                    this.once = this.once.bind(this);
                    this.off = this.off.bind(this);
                    this.offAll = this.offAll.bind(this);
                    this.trigger = this.trigger.bind(this);
                }
                get freeStyle() {
                    return this._freeStyle;
                }
                _afterAllSync(cb) {
                    this._pending++;
                    const pending = this._pending;
                    Object(_utilities__WEBPACK_IMPORTED_MODULE_2__["d"])(() => {
                        if (pending !== this._pending) {
                            return;
                        }
                        cb();
                    });
                }
                _getTag() {
                    if (this._tag) {
                        return this._tag;
                    }
                    if (this._autoGenerateTag) {
                        const tag = typeof window === "undefined" ? {
                            textContent: ""
                        } : document.createElement("style");
                        if (typeof document !== "undefined") {
                            document.head.appendChild(tag);
                        }
                        this._tag = tag;
                        return tag;
                    }
                    return undefined;
                }
                _styleUpdated() {
                    const changeId = this._freeStyle.changeId;
                    const lastChangeId = this._lastFreeStyleChangeId;
                    if (!this._pendingRawChange && changeId === lastChangeId) {
                        return;
                    }
                    this._lastFreeStyleChangeId = changeId;
                    this._pendingRawChange = false;
                    this._afterAllSync(() => this.forceRenderStyles());
                    this.trigger("updated");
                }
                optimize(styles) {
                    const result = {};
                    for (const name of Object.keys(styles)) {
                        let value = styles[name];
                        if (value !== null && typeof value === "object" && !Array.isArray(value) && "hasOwnProperty" in value) {
                            value = this.optimize(value);
                        }
                        switch (name) {
                          case "transform":
                            {
                                if (Array.isArray(value) && value) {
                                    value = value.join("");
                                    value = value.replace(/,\s+/g, ",");
                                }
                                break;
                            }
                        }
                        result[name] = value;
                    }
                    return result;
                }
                style() {
                    const freeStyle = this._freeStyle;
                    const {result: result, debugName: debugName} = Object(_formatting__WEBPACK_IMPORTED_MODULE_1__["a"])(_utilities__WEBPACK_IMPORTED_MODULE_2__["b"].apply(undefined, arguments));
                    const optimized = this.optimize(result);
                    const className = debugName ? freeStyle.registerStyle(optimized, debugName) : freeStyle.registerStyle(optimized);
                    this._styleUpdated();
                    return className;
                }
                on(eventName, callback, context = null) {
                    if (Array.isArray(eventName)) {
                        for (const _eventName of eventName) {
                            this.on(_eventName, callback, context);
                        }
                        return;
                    }
                    const event = {
                        callback: callback,
                        context: context,
                        once: false
                    };
                    if (!(eventName in this._eventListeners)) {
                        this._eventListeners[eventName] = new Set();
                    }
                    if (!this._eventListeners[eventName].has(event)) {
                        this._eventListeners[eventName].add(event);
                    }
                }
                once(eventName, callback, context = null) {
                    if (Array.isArray(eventName)) {
                        for (const _eventName of eventName) {
                            this.once(_eventName, callback, context);
                        }
                        return;
                    }
                    const event = {
                        callback: callback,
                        context: context,
                        once: true
                    };
                    if (!(eventName in this._eventListeners)) {
                        this._eventListeners[eventName] = new Set();
                    }
                    if (!this._eventListeners[eventName].has(event)) {
                        this._eventListeners[eventName].add(event);
                    }
                }
                off(eventName, callback = null, context = null) {
                    if (Array.isArray(eventName)) {
                        let result = true;
                        for (const _eventName of eventName) {
                            result = result && this.off(_eventName, callback, context);
                        }
                        return result;
                    }
                    if (callback) {
                        const eventOnce = {
                            callback: callback,
                            context: context,
                            once: true
                        };
                        const event = {
                            callback: callback,
                            context: context,
                            once: false
                        };
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
                offAll() {
                    for (const eventName of [ "updated", "changeTarget", "render" ]) {
                        this.off(eventName);
                    }
                }
                trigger(eventName, ...eventData) {
                    if (Array.isArray(eventName)) {
                        for (const _eventName of eventName) {
                            this.trigger(_eventName, ...eventData);
                        }
                        return;
                    }
                    if (eventName in this._eventListeners) {
                        this._eventListeners[eventName].forEach(event => {
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
        }).call(this, __webpack_require__(4));
    }, function(module, exports) {
        var process = module.exports = {};
        var cachedSetTimeout;
        var cachedClearTimeout;
        function defaultSetTimout() {
            throw new Error("setTimeout has not been defined");
        }
        function defaultClearTimeout() {
            throw new Error("clearTimeout has not been defined");
        }
        (function() {
            try {
                if (typeof setTimeout === "function") {
                    cachedSetTimeout = setTimeout;
                } else {
                    cachedSetTimeout = defaultSetTimout;
                }
            } catch (e) {
                cachedSetTimeout = defaultSetTimout;
            }
            try {
                if (typeof clearTimeout === "function") {
                    cachedClearTimeout = clearTimeout;
                } else {
                    cachedClearTimeout = defaultClearTimeout;
                }
            } catch (e) {
                cachedClearTimeout = defaultClearTimeout;
            }
        })();
        function runTimeout(fun) {
            if (cachedSetTimeout === setTimeout) {
                return setTimeout(fun, 0);
            }
            if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                cachedSetTimeout = setTimeout;
                return setTimeout(fun, 0);
            }
            try {
                return cachedSetTimeout(fun, 0);
            } catch (e) {
                try {
                    return cachedSetTimeout.call(null, fun, 0);
                } catch (e) {
                    return cachedSetTimeout.call(this, fun, 0);
                }
            }
        }
        function runClearTimeout(marker) {
            if (cachedClearTimeout === clearTimeout) {
                return clearTimeout(marker);
            }
            if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                cachedClearTimeout = clearTimeout;
                return clearTimeout(marker);
            }
            try {
                return cachedClearTimeout(marker);
            } catch (e) {
                try {
                    return cachedClearTimeout.call(null, marker);
                } catch (e) {
                    return cachedClearTimeout.call(this, marker);
                }
            }
        }
        var queue = [];
        var draining = false;
        var currentQueue;
        var queueIndex = -1;
        function cleanUpNextTick() {
            if (!draining || !currentQueue) {
                return;
            }
            draining = false;
            if (currentQueue.length) {
                queue = currentQueue.concat(queue);
            } else {
                queueIndex = -1;
            }
            if (queue.length) {
                drainQueue();
            }
        }
        function drainQueue() {
            if (draining) {
                return;
            }
            var timeout = runTimeout(cleanUpNextTick);
            draining = true;
            var len = queue.length;
            while (len) {
                currentQueue = queue;
                queue = [];
                while (++queueIndex < len) {
                    if (currentQueue) {
                        currentQueue[queueIndex].run();
                    }
                }
                queueIndex = -1;
                len = queue.length;
            }
            currentQueue = null;
            draining = false;
            runClearTimeout(timeout);
        }
        process.nextTick = function(fun) {
            var args = new Array(arguments.length - 1);
            if (arguments.length > 1) {
                for (var i = 1; i < arguments.length; i++) {
                    args[i - 1] = arguments[i];
                }
            }
            queue.push(new Item(fun, args));
            if (queue.length === 1 && !draining) {
                runTimeout(drainQueue);
            }
        };
        function Item(fun, array) {
            this.fun = fun;
            this.array = array;
        }
        Item.prototype.run = function() {
            this.fun.apply(null, this.array);
        };
        process.title = "browser";
        process.browser = true;
        process.env = {};
        process.argv = [];
        process.version = "";
        process.versions = {};
        function noop() {}
        process.on = noop;
        process.addListener = noop;
        process.once = noop;
        process.off = noop;
        process.removeListener = noop;
        process.removeAllListeners = noop;
        process.emit = noop;
        process.prependListener = noop;
        process.prependOnceListener = noop;
        process.listeners = function(name) {
            return [];
        };
        process.binding = function(name) {
            throw new Error("process.binding is not supported");
        };
        process.cwd = function() {
            return "/";
        };
        process.chdir = function(dir) {
            throw new Error("process.chdir is not supported");
        };
        process.umask = function() {
            return 0;
        };
    }, function(module, exports) {}, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var typestyle = __webpack_require__(3);
        var types = __webpack_require__(5);
        var utilities = __webpack_require__(0);
        function createTypeStyle(target, autoGenerateTag = false, debugNames) {
            const instance = new typestyle["a"]({
                autoGenerateTag: autoGenerateTag,
                debugNames: debugNames
            });
            if (target) {
                instance.setStylesTarget(target);
            }
            return instance;
        }
        const fontStyleItalic = {
            fontStyle: "italic"
        };
        const fontWeightNormal = {
            fontWeight: "normal"
        };
        const fontWeightBold = {
            fontWeight: "bold"
        };
        var flexRoot = {
            display: [ "-ms-flexbox", "-webkit-flex", "flex" ]
        };
        var pass = {
            display: "inherit",
            "-ms-flex-direction": "inherit",
            "-webkit-flex-direction": "inherit",
            flexDirection: "inherit",
            "-ms-flex-positive": 1,
            "-webkit-flex-grow": 1,
            flexGrow: 1
        };
        var inlineRoot = {
            display: [ "-ms-inline-flexbox", "-webkit-inline-flex", "inline-flex" ]
        };
        const horizontal = Object(utilities["b"])(flexRoot, {
            "-ms-flex-direction": "row",
            "-webkit-flex-direction": "row",
            flexDirection: "row"
        });
        const vertical = Object(utilities["b"])(flexRoot, {
            "-ms-flex-direction": "column",
            "-webkit-flex-direction": "column",
            flexDirection: "column"
        });
        var wrap = {
            "-ms-flex-wrap": "wrap",
            "-webkit-flex-wrap": "wrap",
            flexWrap: "wrap"
        };
        var content = {
            "-ms-flex-negative": 0,
            "-webkit-flex-shrink": 0,
            flexShrink: 0,
            flexBasis: "auto"
        };
        var flex = {
            "-ms-flex": 1,
            "-webkit-flex": 1,
            flex: 1
        };
        var flex1 = flex;
        var flex2 = {
            "-ms-flex": 2,
            "-webkit-flex": 2,
            flex: 2
        };
        var flex3 = {
            "-ms-flex": 3,
            "-webkit-flex": 3,
            flex: 3
        };
        var flex4 = {
            "-ms-flex": 4,
            "-webkit-flex": 4,
            flex: 4
        };
        var flex5 = {
            "-ms-flex": 5,
            "-webkit-flex": 5,
            flex: 5
        };
        var flex6 = {
            "-ms-flex": 6,
            "-webkit-flex": 6,
            flex: 6
        };
        var flex7 = {
            "-ms-flex": 7,
            "-webkit-flex": 7,
            flex: 7
        };
        var flex8 = {
            "-ms-flex": 8,
            "-webkit-flex": 8,
            flex: 8
        };
        var flex9 = {
            "-ms-flex": 9,
            "-webkit-flex": 9,
            flex: 9
        };
        var flex10 = {
            "-ms-flex": 10,
            "-webkit-flex": 10,
            flex: 10
        };
        var flex11 = {
            "-ms-flex": 11,
            "-webkit-flex": 11,
            flex: 11
        };
        var flex12 = {
            "-ms-flex": 12,
            "-webkit-flex": 12,
            flex: 12
        };
        var start = {
            "-ms-flex-align": "start",
            "-webkit-align-items": "flex-start",
            alignItems: "flex-start"
        };
        var center = {
            "-ms-flex-align": "center",
            "-webkit-align-items": "center",
            alignItems: "center"
        };
        var end = {
            "-ms-flex-align": "end",
            "-webkit-align-items": "flex-end",
            alignItems: "flex-end"
        };
        var startJustified = {
            "-ms-flex-pack": "start",
            "-webkit-justify-content": "flex-start",
            justifyContent: "flex-start"
        };
        var centerJustified = {
            "-ms-flex-pack": "center",
            "-webkit-justify-content": "center",
            justifyContent: "center"
        };
        var endJustified = {
            "-ms-flex-pack": "end",
            "-webkit-justify-content": "flex-end",
            justifyContent: "flex-end"
        };
        var aroundJustified = {
            "-ms-flex-pack": "distribute",
            "-webkit-justify-content": "space-around",
            justifyContent: "space-around"
        };
        var betweenJustified = {
            "-ms-flex-pack": "justify",
            "-webkit-justify-content": "space-between",
            justifyContent: "space-between"
        };
        var centerCenter = Object(utilities["b"])(flexRoot, center, centerJustified);
        var selfStart = {
            "-ms-flex-item-align": "start",
            "-webkit-align-self": "flex-start",
            alignSelf: "flex-start"
        };
        var selfCenter = {
            "-ms-flex-item-align": "center",
            "-webkit-align-self": "center",
            alignSelf: "center"
        };
        var selfEnd = {
            "-ms-flex-item-align": "end",
            "-webkit-align-self": "flex-end",
            alignSelf: "flex-end"
        };
        var selfStretch = {
            "-ms-flex-item-align": "stretch",
            "-webkit-align-self": "stretch",
            alignSelf: "stretch"
        };
        var layerParent = {
            position: "relative"
        };
        const attachToLayerParent = {
            position: "absolute"
        };
        var newLayer = Object(utilities["b"])(attachToLayerParent, {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        });
        const attachToTop = Object(utilities["b"])(attachToLayerParent, {
            top: 0,
            left: 0,
            right: 0
        });
        const attachToRight = Object(utilities["b"])(attachToLayerParent, {
            top: 0,
            right: 0,
            bottom: 0
        });
        const attachToBottom = Object(utilities["b"])(attachToLayerParent, {
            right: 0,
            bottom: 0,
            left: 0
        });
        const attachToLeft = Object(utilities["b"])(attachToLayerParent, {
            top: 0,
            bottom: 0,
            left: 0
        });
        const fixed = {
            position: "fixed"
        };
        const pageTop = Object(utilities["b"])(fixed, {
            top: 0,
            left: 0,
            right: 0
        });
        const pageRight = Object(utilities["b"])(fixed, {
            top: 0,
            right: 0,
            bottom: 0
        });
        const pageBottom = Object(utilities["b"])(fixed, {
            right: 0,
            bottom: 0,
            left: 0
        });
        const pageLeft = Object(utilities["b"])(fixed, {
            top: 0,
            bottom: 0,
            left: 0
        });
        function boxUnitToString(value) {
            if (typeof value === "number") {
                return value.toString() + "px";
            } else {
                return value;
            }
        }
        function createBoxFunction(mapFromBox) {
            const result = (a, b, c, d) => {
                if (b === undefined && c === undefined && d === undefined) {
                    b = c = d = a;
                } else if (c === undefined && d === undefined) {
                    c = a;
                    d = b;
                }
                let box = {
                    top: boxUnitToString(a),
                    right: boxUnitToString(b),
                    bottom: boxUnitToString(c),
                    left: boxUnitToString(d)
                };
                return mapFromBox(box);
            };
            return result;
        }
        const padding = createBoxFunction(box => {
            return {
                paddingTop: box.top,
                paddingRight: box.right,
                paddingBottom: box.bottom,
                paddingLeft: box.left
            };
        });
        const margin = createBoxFunction(box => {
            return {
                marginTop: box.top,
                marginRight: box.right,
                marginBottom: box.bottom,
                marginLeft: box.left
            };
        });
        const border = createBoxFunction(box => {
            return {
                borderTop: box.top,
                borderRight: box.right,
                borderBottom: box.bottom,
                borderLeft: box.left
            };
        });
        const verticallySpaced = margin => {
            const spacing = boxUnitToString(margin);
            return {
                "&>*": {
                    marginBottom: spacing + " !important"
                },
                "&>*:last-child": {
                    marginBottom: "0px !important"
                }
            };
        };
        const horizontallySpaced = margin => {
            const spacing = boxUnitToString(margin);
            return {
                "&>*": {
                    marginRight: spacing + " !important"
                },
                "&>*:last-child": {
                    marginRight: "0px !important"
                }
            };
        };
        function gridSpaced(topAndBottom, leftAndRight = topAndBottom) {
            const vertical = boxUnitToString(topAndBottom);
            const horizontal = boxUnitToString(leftAndRight);
            return {
                marginTop: "-" + vertical,
                marginLeft: "-" + horizontal,
                "&>*": {
                    marginTop: vertical,
                    marginLeft: horizontal
                }
            };
        }
        const fillParent = {
            width: "100%",
            height: "100%"
        };
        const maxWidth = value => {
            const maxWidth = boxUnitToString(value);
            return {
                maxWidth: maxWidth
            };
        };
        const maxHeight = value => {
            const maxHeight = boxUnitToString(value);
            return {
                maxHeight: maxHeight
            };
        };
        const horizontallyCenterSelf = {
            marginLeft: "auto",
            marginRight: "auto"
        };
        const horizontallyCenterChildren = {
            textAlign: "center"
        };
        const height = value => {
            const height = boxUnitToString(value);
            return {
                height: height
            };
        };
        const width = value => {
            const width = boxUnitToString(value);
            return {
                width: width
            };
        };
        const scroll_scroll = {
            "-webkit-overflow-scrolling": "touch",
            overflow: "auto"
        };
        const scrollX = {
            "-webkit-overflow-scrolling": "touch",
            overflowX: "auto"
        };
        const scrollY = {
            "-webkit-overflow-scrolling": "touch",
            overflowY: "auto"
        };
        const someChildWillScroll = {
            overflow: "hidden"
        };
        var block = {
            display: "block"
        };
        var none = {
            display: "none"
        };
        var inlineBlock = {
            display: "inline-block"
        };
        var invisible = {
            visibility: "hidden"
        };
        function normalize() {
            cssRaw(`\n    button,hr,input{overflow:visible}audio,canvas,progress,video{display:inline-block}progress,sub,sup{vertical-align:baseline}html{font-family:sans-serif;line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0} menu,article,aside,details,footer,header,nav,section{display:block}h1{font-size:2em;margin:.67em 0}figcaption,figure,main{display:block}figure{margin:1em 40px}hr{box-sizing:content-box;height:0}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}a{background-color:transparent;-webkit-text-decoration-skip:objects}a:active,a:hover{outline-width:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}dfn{font-style:italic}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}audio:not([controls]){display:none;height:0}img{border-style:none}svg:not(:root){overflow:hidden}button,input,optgroup,select,textarea{font-family:sans-serif;font-size:100%;line-height:1.15;margin:0}button,input{}button,select{text-transform:none}[type=submit], [type=reset],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:ButtonText dotted 1px}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}[hidden],template{display:none}\n    `.trim());
        }
        function setupPage(rootSelector) {
            cssRule("html, body", {
                height: "100%",
                width: "100%",
                padding: 0,
                margin: 0
            });
            cssRule("html", {
                "-moz-box-sizing": "border-box",
                "-webkit-box-sizing": "border-box",
                boxSizing: "border-box"
            });
            cssRule("*,*:before,*:after", {
                boxSizing: "inherit"
            });
            cssRule(rootSelector, fillParent);
        }
        __webpack_require__.d(__webpack_exports__, "setStylesTarget", function() {
            return setStylesTarget;
        });
        __webpack_require__.d(__webpack_exports__, "cssRaw", function() {
            return cssRaw;
        });
        __webpack_require__.d(__webpack_exports__, "cssRule", function() {
            return cssRule;
        });
        __webpack_require__.d(__webpack_exports__, "forceRenderStyles", function() {
            return forceRenderStyles;
        });
        __webpack_require__.d(__webpack_exports__, "fontFace", function() {
            return fontFace;
        });
        __webpack_require__.d(__webpack_exports__, "getStyles", function() {
            return getStyles;
        });
        __webpack_require__.d(__webpack_exports__, "keyframes", function() {
            return keyframes;
        });
        __webpack_require__.d(__webpack_exports__, "reinit", function() {
            return reinit;
        });
        __webpack_require__.d(__webpack_exports__, "style", function() {
            return style;
        });
        __webpack_require__.d(__webpack_exports__, "stylesheet", function() {
            return stylesheet;
        });
        __webpack_require__.d(__webpack_exports__, "events", function() {
            return events;
        });
        __webpack_require__.d(__webpack_exports__, "instance", function() {
            return src_instance;
        });
        __webpack_require__.d(__webpack_exports__, "TypeStyle", function() {
            return typestyle["a"];
        });
        __webpack_require__.d(__webpack_exports__, "classes", function() {
            return utilities["a"];
        });
        __webpack_require__.d(__webpack_exports__, "createTypeStyle", function() {
            return createTypeStyle;
        });
        __webpack_require__.d(__webpack_exports__, "extend", function() {
            return utilities["b"];
        });
        __webpack_require__.d(__webpack_exports__, "media", function() {
            return utilities["c"];
        });
        __webpack_require__.d(__webpack_exports__, "types", function() {
            return types;
        });
        __webpack_require__.d(__webpack_exports__, "fontStyleItalic", function() {
            return fontStyleItalic;
        });
        __webpack_require__.d(__webpack_exports__, "fontWeightNormal", function() {
            return fontWeightNormal;
        });
        __webpack_require__.d(__webpack_exports__, "fontWeightBold", function() {
            return fontWeightBold;
        });
        __webpack_require__.d(__webpack_exports__, "flexRoot", function() {
            return flexRoot;
        });
        __webpack_require__.d(__webpack_exports__, "pass", function() {
            return pass;
        });
        __webpack_require__.d(__webpack_exports__, "inlineRoot", function() {
            return inlineRoot;
        });
        __webpack_require__.d(__webpack_exports__, "horizontal", function() {
            return horizontal;
        });
        __webpack_require__.d(__webpack_exports__, "vertical", function() {
            return vertical;
        });
        __webpack_require__.d(__webpack_exports__, "wrap", function() {
            return wrap;
        });
        __webpack_require__.d(__webpack_exports__, "content", function() {
            return content;
        });
        __webpack_require__.d(__webpack_exports__, "flex", function() {
            return flex;
        });
        __webpack_require__.d(__webpack_exports__, "flex1", function() {
            return flex1;
        });
        __webpack_require__.d(__webpack_exports__, "flex2", function() {
            return flex2;
        });
        __webpack_require__.d(__webpack_exports__, "flex3", function() {
            return flex3;
        });
        __webpack_require__.d(__webpack_exports__, "flex4", function() {
            return flex4;
        });
        __webpack_require__.d(__webpack_exports__, "flex5", function() {
            return flex5;
        });
        __webpack_require__.d(__webpack_exports__, "flex6", function() {
            return flex6;
        });
        __webpack_require__.d(__webpack_exports__, "flex7", function() {
            return flex7;
        });
        __webpack_require__.d(__webpack_exports__, "flex8", function() {
            return flex8;
        });
        __webpack_require__.d(__webpack_exports__, "flex9", function() {
            return flex9;
        });
        __webpack_require__.d(__webpack_exports__, "flex10", function() {
            return flex10;
        });
        __webpack_require__.d(__webpack_exports__, "flex11", function() {
            return flex11;
        });
        __webpack_require__.d(__webpack_exports__, "flex12", function() {
            return flex12;
        });
        __webpack_require__.d(__webpack_exports__, "start", function() {
            return start;
        });
        __webpack_require__.d(__webpack_exports__, "center", function() {
            return center;
        });
        __webpack_require__.d(__webpack_exports__, "end", function() {
            return end;
        });
        __webpack_require__.d(__webpack_exports__, "startJustified", function() {
            return startJustified;
        });
        __webpack_require__.d(__webpack_exports__, "centerJustified", function() {
            return centerJustified;
        });
        __webpack_require__.d(__webpack_exports__, "endJustified", function() {
            return endJustified;
        });
        __webpack_require__.d(__webpack_exports__, "aroundJustified", function() {
            return aroundJustified;
        });
        __webpack_require__.d(__webpack_exports__, "betweenJustified", function() {
            return betweenJustified;
        });
        __webpack_require__.d(__webpack_exports__, "centerCenter", function() {
            return centerCenter;
        });
        __webpack_require__.d(__webpack_exports__, "selfStart", function() {
            return selfStart;
        });
        __webpack_require__.d(__webpack_exports__, "selfCenter", function() {
            return selfCenter;
        });
        __webpack_require__.d(__webpack_exports__, "selfEnd", function() {
            return selfEnd;
        });
        __webpack_require__.d(__webpack_exports__, "selfStretch", function() {
            return selfStretch;
        });
        __webpack_require__.d(__webpack_exports__, "layerParent", function() {
            return layerParent;
        });
        __webpack_require__.d(__webpack_exports__, "attachToLayerParent", function() {
            return attachToLayerParent;
        });
        __webpack_require__.d(__webpack_exports__, "newLayer", function() {
            return newLayer;
        });
        __webpack_require__.d(__webpack_exports__, "attachToTop", function() {
            return attachToTop;
        });
        __webpack_require__.d(__webpack_exports__, "attachToRight", function() {
            return attachToRight;
        });
        __webpack_require__.d(__webpack_exports__, "attachToBottom", function() {
            return attachToBottom;
        });
        __webpack_require__.d(__webpack_exports__, "attachToLeft", function() {
            return attachToLeft;
        });
        __webpack_require__.d(__webpack_exports__, "pageTop", function() {
            return pageTop;
        });
        __webpack_require__.d(__webpack_exports__, "pageRight", function() {
            return pageRight;
        });
        __webpack_require__.d(__webpack_exports__, "pageBottom", function() {
            return pageBottom;
        });
        __webpack_require__.d(__webpack_exports__, "pageLeft", function() {
            return pageLeft;
        });
        __webpack_require__.d(__webpack_exports__, "padding", function() {
            return padding;
        });
        __webpack_require__.d(__webpack_exports__, "margin", function() {
            return margin;
        });
        __webpack_require__.d(__webpack_exports__, "border", function() {
            return border;
        });
        __webpack_require__.d(__webpack_exports__, "verticallySpaced", function() {
            return verticallySpaced;
        });
        __webpack_require__.d(__webpack_exports__, "horizontallySpaced", function() {
            return horizontallySpaced;
        });
        __webpack_require__.d(__webpack_exports__, "gridSpaced", function() {
            return gridSpaced;
        });
        __webpack_require__.d(__webpack_exports__, "fillParent", function() {
            return fillParent;
        });
        __webpack_require__.d(__webpack_exports__, "maxWidth", function() {
            return maxWidth;
        });
        __webpack_require__.d(__webpack_exports__, "maxHeight", function() {
            return maxHeight;
        });
        __webpack_require__.d(__webpack_exports__, "horizontallyCenterSelf", function() {
            return horizontallyCenterSelf;
        });
        __webpack_require__.d(__webpack_exports__, "horizontallyCenterChildren", function() {
            return horizontallyCenterChildren;
        });
        __webpack_require__.d(__webpack_exports__, "height", function() {
            return height;
        });
        __webpack_require__.d(__webpack_exports__, "width", function() {
            return width;
        });
        __webpack_require__.d(__webpack_exports__, "scroll", function() {
            return scroll_scroll;
        });
        __webpack_require__.d(__webpack_exports__, "scrollX", function() {
            return scrollX;
        });
        __webpack_require__.d(__webpack_exports__, "scrollY", function() {
            return scrollY;
        });
        __webpack_require__.d(__webpack_exports__, "someChildWillScroll", function() {
            return someChildWillScroll;
        });
        __webpack_require__.d(__webpack_exports__, "block", function() {
            return block;
        });
        __webpack_require__.d(__webpack_exports__, "none", function() {
            return none;
        });
        __webpack_require__.d(__webpack_exports__, "inlineBlock", function() {
            return inlineBlock;
        });
        __webpack_require__.d(__webpack_exports__, "invisible", function() {
            return invisible;
        });
        __webpack_require__.d(__webpack_exports__, "normalize", function() {
            return normalize;
        });
        __webpack_require__.d(__webpack_exports__, "setupPage", function() {
            return setupPage;
        });
        const ts = new typestyle["a"]({
            autoGenerateTag: true
        });
        const setStylesTarget = ts.setStylesTarget;
        const cssRaw = ts.cssRaw;
        const cssRule = ts.cssRule;
        const forceRenderStyles = ts.forceRenderStyles;
        const fontFace = ts.fontFace;
        const getStyles = ts.getStyles;
        const keyframes = ts.keyframes;
        const reinit = ts.reinit;
        const style = ts.style;
        const stylesheet = ts.stylesheet;
        const events = {
            on: ts.on,
            once: ts.once,
            off: ts.off,
            trigger: ts.trigger
        };
        const src_instance = ts;
    } ]);
});