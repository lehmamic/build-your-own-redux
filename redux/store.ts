import { Reducer } from './reducer';
import { Action } from './action';

export class Store<T> {
    private state: T;

    constructor(private reducer: Reducer<T>, initialState: T) {
        this.state = initialState;
    }

    public getState(): T {
        return this.state;
    }

    public dispatch(action: Action): void {
        this.state = this.reducer(this.state, action);
    }
};
