import * as types from './../types';
export declare type Dictionary = {
    [key: string]: any;
};
export declare function ensureStringObj(object: types.NestedCSSProperties): {
    result: any;
    debugName: string;
};
export declare function explodeKeyframes(frames: types.KeyFrames): {
    $debugName?: string;
    keyframes: types.KeyFrames;
};
