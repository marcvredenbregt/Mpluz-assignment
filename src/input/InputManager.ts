import { Input } from "./Input";
import { InputState } from "./InputState";
const ZERO_INDEX_CORRECTION = 1;

export class InputManager {
    private readonly inputs: Input[] = [];

    constructor(encoderId: string, inputCount: number) {
        this.createInputs(inputCount, encoderId);
    }

    getInput(id: number): Input {
        return this.inputs[id - ZERO_INDEX_CORRECTION];
    }

    get length(): number {
        return this.inputs.length;
    }

    connectInput(id: number): void {
        const input = this.inputs[id - ZERO_INDEX_CORRECTION];
        if (input) {
            input.state = InputState.Signal;
        } else {
            throw new Error('Input not found');
        }
    }

    disconnectInput(id: number): void {
        const input = this.inputs[id - ZERO_INDEX_CORRECTION];
        if (input) {
            input.state = InputState.NoSignal;
        } else {
            throw new Error('Input not found');
        }
    }

    findInputId(inputId: string): Input | null {
        return this.inputs.find(input => input.id === inputId) || null;
    }

    private createInputs(count: number, encoderId: string): void {
        for (let i = 1; i <= count; i++) {
            this.inputs.push(new Input(encoderId, i));
        }
    }
}