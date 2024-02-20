import { InputState } from "./InputState";

export class Input {
    private _state: InputState;
    private _id: string; // dongleId + '-' + inputNumber

    constructor(
        dongleId: string,
        inputNumber: number,
        state: InputState = InputState.NoSignal
    ) {
        this._id = `${dongleId  }-${  inputNumber}`;
        this._state = state;
    }

    get state(): InputState {
        return this._state;
    }

    set state(state: InputState) {
        this._state = state;
    }

    get id(): string {
        return this._id;
    }
}
