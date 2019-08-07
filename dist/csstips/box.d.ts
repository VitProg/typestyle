import * as types from '../types';
export declare type BoxUnit = number | string;
export interface BoxFunction<T> {
    (all: BoxUnit): T;
    (topAndBottom: BoxUnit, leftAndRight: BoxUnit): T;
    (top: BoxUnit, right: BoxUnit, bottom: BoxUnit, left: BoxUnit): T;
}
export declare const padding: BoxFunction<{
    paddingTop: string;
    paddingRight: string;
    paddingBottom: string;
    paddingLeft: string;
}>;
export declare const margin: BoxFunction<{
    marginTop: string;
    marginRight: string;
    marginBottom: string;
    marginLeft: string;
}>;
export declare const border: BoxFunction<{
    borderTop: string;
    borderRight: string;
    borderBottom: string;
    borderLeft: string;
}>;
export declare const verticallySpaced: (margin: types.TLength) => types.CSSProperties;
export declare const horizontallySpaced: (margin: types.TLength) => types.CSSProperties;
export declare function gridSpaced(both: BoxUnit): types.CSSProperties;
export declare const fillParent: {
    width: string;
    height: string;
};
export declare const maxWidth: (value: types.TLength) => {
    maxWidth: string;
};
export declare const maxHeight: (value: types.TLength) => {
    maxHeight: string;
};
export declare const horizontallyCenterSelf: {
    marginLeft: string;
    marginRight: string;
};
export declare const horizontallyCenterChildren: {
    textAlign: "center";
};
export declare const height: (value: types.TLength) => {
    height: string;
};
export declare const width: (value: types.TLength) => {
    width: string;
};
