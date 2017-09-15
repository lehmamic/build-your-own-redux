import { Action, Reducer, Store } from './redux';

let reducer: Reducer<number> = (state: number, action: Action) => {
    switch(action.type) {
        case 'INCREMENT':
            return state + 1;

        case 'DECREMENT':
            return state - 1;

        case 'PLUS':
            return state + action.payload;

        default:
            return state; // <-- don't forget!
    }
};

let store = new Store<number>(reducer, 0);
console.log(store.getState()); // => 0

store.dispatch({ type: 'INCREMENT' });
console.log(store.getState()); // => 1

store.dispatch({ type: 'INCREMENT' });
console.log(store.getState()); // => 2

store.dispatch({ type: 'DECREMENT' });
console.log(store.getState()); // => 1
