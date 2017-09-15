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

let unsubscribe = store.subscribe(() => {
    console.log(`subscribed: ${store.getState()}`);
});

store.dispatch({ type: 'INCREMENT' }); // => subscribed: 1

store.dispatch({ type: 'INCREMENT' }); // => subscribed: 2

unsubscribe();
store.dispatch({ type: 'DECREMENT' }); // => nothing logged
