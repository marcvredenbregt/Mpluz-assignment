import { Input } from "../input/Input";
import { InputState } from "../input/InputState";
import { OutputState } from "./OutputState";

export class Output {
    private _state: OutputState;
    private _id: string; // dongleId + '-' + outputNumber
    private _routedInput: Input | null = null;

    constructor(
        dongleId: string,
        outputNumber: number,
        state: OutputState = OutputState.Disconnected
    ) {
        this._id = `${dongleId  }-${  outputNumber}`;
        this._state = state;
    }

    get state(): OutputState {
        return this._state;
    }

    set state(state: OutputState) {
        this._state = state;
    }

    get routedInput(): Input | null {
        return this._routedInput;
    }

    route(input: Input): void {
        // Check if input has signal
        if (input.state !== InputState.Signal) {
            throw new Error('Input has no signal');
        }
        this._routedInput = input;
    }

    unroute(): void {
        this._routedInput = null;
    }

    get id(): string {
        return this._id;
    }
}
