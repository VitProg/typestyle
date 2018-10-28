
import {TypeStyle, classes, createTypeStyle, extend, media, types} from './index-base';
export {TypeStyle, classes, createTypeStyle, extend, media, types};

/** Zero configuration, default instance of TypeStyle */
const ts = new TypeStyle({ autoGenerateTag: true });

/** Sets the target tag where we write the css on style updates */
export const setStylesTarget = ts.setStylesTarget;

/**
 * Insert `raw` CSS as a string. This is useful for e.g.
 * - third party CSS that you are customizing with template strings
 * - generating raw CSS in JavaScript
 * - reset libraries like normalize.css that you can use without loaders
 */
export const cssRaw = ts.cssRaw;

/**
 * Takes CSSProperties and registers it to a global selector (body, html, etc.)
 */
export const cssRule = ts.cssRule;

/**
 * Renders styles to the singleton tag imediately
 * NOTE: You should only call it on initial render to prevent any non CSS flash.
 * After that it is kept sync using `requestAnimationFrame` and we haven't noticed any bad flashes.
 **/
export const forceRenderStyles = ts.forceRenderStyles;

/**
 * Utility function to register an @font-face
 */
export const fontFace = ts.fontFace;

/**
 * Allows use to use the stylesheet in a node.js environment
 */
export const getStyles = ts.getStyles;

/**
 * Takes keyframes and returns a generated animationName
 */
export const keyframes = ts.keyframes;

/**
 * Helps with testing. Reinitializes FreeStyle + raw
 */
export const reinit = ts.reinit;

/**
 * Takes CSSProperties and return a generated className you can use on your component
 */
export const style = ts.style;

/**
 * Takes an object where property names are ideal class names and property values are CSSProperties, and
 * returns an object where property names are the same ideal class names and the property values are
 * the actual generated class names using the ideal class name as the $debugName
 */
export const stylesheet = ts.stylesheet;

export const events = {
    on: ts.on,
    once: ts.once,
    off: ts.off,
    trigger: ts.trigger,
};

export const instance = ts;