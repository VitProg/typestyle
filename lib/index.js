"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_base_1 = require("./index-base");
exports.TypeStyle = index_base_1.TypeStyle;
exports.classes = index_base_1.classes;
exports.createTypeStyle = index_base_1.createTypeStyle;
exports.extend = index_base_1.extend;
exports.media = index_base_1.media;
exports.types = index_base_1.types;
/** Zero configuration, default instance of TypeStyle */
var ts = new index_base_1.TypeStyle({ autoGenerateTag: true });
/** Sets the target tag where we write the css on style updates */
exports.setStylesTarget = ts.setStylesTarget;
/**
 * Insert `raw` CSS as a string. This is useful for e.g.
 * - third party CSS that you are customizing with template strings
 * - generating raw CSS in JavaScript
 * - reset libraries like normalize.css that you can use without loaders
 */
exports.cssRaw = ts.cssRaw;
/**
 * Takes CSSProperties and registers it to a global selector (body, html, etc.)
 */
exports.cssRule = ts.cssRule;
/**
 * Renders styles to the singleton tag imediately
 * NOTE: You should only call it on initial render to prevent any non CSS flash.
 * After that it is kept sync using `requestAnimationFrame` and we haven't noticed any bad flashes.
 **/
exports.forceRenderStyles = ts.forceRenderStyles;
/**
 * Utility function to register an @font-face
 */
exports.fontFace = ts.fontFace;
/**
 * Allows use to use the stylesheet in a node.js environment
 */
exports.getStyles = ts.getStyles;
/**
 * Takes keyframes and returns a generated animationName
 */
exports.keyframes = ts.keyframes;
/**
 * Helps with testing. Reinitializes FreeStyle + raw
 */
exports.reinit = ts.reinit;
/**
 * Takes CSSProperties and return a generated className you can use on your component
 */
exports.style = ts.style;
/**
 * Takes an object where property names are ideal class names and property values are CSSProperties, and
 * returns an object where property names are the same ideal class names and the property values are
 * the actual generated class names using the ideal class name as the $debugName
 */
exports.stylesheet = ts.stylesheet;
exports.events = {
    on: ts.on,
    once: ts.once,
    off: ts.off,
    trigger: ts.trigger,
};
exports.instance = ts;
