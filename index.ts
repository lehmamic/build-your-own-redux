import { Action, Reducer } from './redux';

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

let incrementAction: Action = {
    type: 'INCREMENT'
}

console.log(reducer(0, incrementAction)); // => 1
console.log(reducer(1, incrementAction)); // => 2

let decrementAction: Action = {
    type: 'DECREMENT'
}

console.log(reducer(100, decrementAction)); // => 99

let unknownAction: Action = {
    type: 'UNKNOWN'
};

console.log(reducer(100, unknownAction)); // => 100

console.log(reducer(3, { type: 'PLUS', payload: 7 })); // => 10
console.log(reducer(3, { type: 'PLUS', payload: 9000 })); // => 9003
console.log(reducer(3, { type: 'PLUS', payload: -2 })); // => 1
