import { Action, Reducer, Store } from './redux';
import { getValueAsync } from './side-effect';

interface AppState {
    message: string;
    counter: number
}

let counterReducer: Reducer<number> = (state: number, action: Action) => {
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

let messageReducer: Reducer<string> = (state: string, action: Action) => {
    switch(action.type) {
        case 'MESSAGE':
            return action.payload;

        default:
            return state; // <-- don't forget!
    }
};

let rootReducer: Reducer<AppState> = (state: AppState, action: Action) =>{
    return {
        counter: counterReducer(state.counter, action),
        message: messageReducer(state.message, action)
    }
};

let store = new Store<AppState>(rootReducer, { counter:0, message: '' });
console.log(store.getState()); // => { counter: 0, message: '' }

let unsubscribe = store.subscribe(() => {
    console.log(`subscribed: ${JSON.stringify(store.getState())}`);
});

let sideEffect = function(value: number) {
    store.dispatch({ type: 'MESSAGE', payload: 'Start loading the value' });

    getValueAsync(value, (val: number, err: string) => {
        if (err === undefined) {
            store.dispatch({ type: 'MESSAGE', payload: 'Loading the value succeeded' });
            store.dispatch({ type: 'PLUS', payload: val });
        } else {
            store.dispatch({ type: 'MESSAGE', payload: 'Loading the value failed' });
        };
    });
};

sideEffect(5);
// => subscribed: { counter: 0, message: 'Start loading the value' }
// => subscribed: { counter: 0, message: 'Loading the value succeeded' }
// => subscribed: { counter: 5, message: 'Loading the value succeeded' }

sideEffect(undefined);
// => subscribed: { counter: 5, message: 'Start loading the value' }
// => subscribed: { counter: 5, message: 'Loading the value failed' }
