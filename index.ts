import { Action, Reducer, Store } from './redux';

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

store.dispatch({ type: 'INCREMENT' });
console.log(store.getState()); // => { counter: 1, message: '' }

store.dispatch({ type: 'MESSAGE', payload: 'Hello World' });
console.log(store.getState()); // => { counter: 1, message: 'Hello World' }
