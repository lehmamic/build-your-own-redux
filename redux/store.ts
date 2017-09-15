import { Reducer } from './reducer';
import { Action } from './action';
import { ListenerCallback } from './listenerCallback';
import { UnsubscribeCallback } from './unsubscribeCallback';

export class Store<T> {
    private state: T;
    private listeners: Array<ListenerCallback> = [];

    constructor(private reducer: Reducer<T>, initialState: T) {
        this.state = initialState;
    }

    public getState(): T {
        return this.state;
    }

    public dispatch(action: Action): void {
        this.state = this.reducer(this.state, action);

        this.listeners.forEach(listener => listener());
    }

    public subscribe(listener: ListenerCallback): UnsubscribeCallback {
        this.listeners.push(listener);

        return () => {
            // returns an "unsubscribe" function
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }
};
