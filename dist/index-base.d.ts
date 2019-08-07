import { TypeStyle } from './internal/typestyle';
export { TypeStyle };
import * as types from './types';
export { types };
export { extend, classes, media } from './internal/utilities';
export declare function createTypeStyle(target?: {
    textContent: string | null;
}, autoGenerateTag?: boolean, debugNames?: boolean): TypeStyle;
