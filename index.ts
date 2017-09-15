import { Action, Reducer } from './redux';

let reducer: Reducer<number> = (state: number, action: Action) => {
    return state;
};

console.log(reducer(0, null)); // => 0
