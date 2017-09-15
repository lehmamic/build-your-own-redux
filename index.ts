import { Action, Reducer } from './redux';

let incrementAction: Action = {
    type: 'INCREMENT'
}

let decrementAction: Action = {
    type: 'DECREMENT'
}

let reducer: Reducer<number> = (state: number, action: Action) => {
    switch(action.type) {
        case 'INCREMENT':
            return state + 1;

        case 'DECREMENT':
            return state - 1;

        default:
            return state;
    }
};

console.log(reducer(0, incrementAction)); // => 1
console.log(reducer(1, incrementAction)); // => 2

console.log(reducer(100, decrementAction)); // => 99
