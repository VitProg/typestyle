import { TypeStyle } from './internal/typestyle';
export { TypeStyle };
/**
 * All the CSS types in the 'types' namespace
 */
import * as types from './types';
export { types };
/**
 * Export certain utilities
 */
export { extend, classes, media } from './internal/utilities';
/**
 * Creates a new instance of TypeStyle separate from the default instance.
 *
 * - Use this for creating a different typestyle instance for a shadow dom component.
 * - Use this if you don't want an auto tag generated and you just want to collect the CSS.
 *
 * NOTE: styles aren't shared between different instances.
 */
export declare function createTypeStyle(target?: {
    textContent: string | null;
}, autoGenerateTag?: boolean): TypeStyle;
