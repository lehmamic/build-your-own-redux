import { SideEffectCallback } from './sideEffectCallback';

export const getValueAsync = (value: number, callback: SideEffectCallback) => {
    if (value !== undefined) {

        callback(value, undefined);
    } else {
        callback(undefined, 'no value present');
    }
};
