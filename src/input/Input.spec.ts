import { Input } from './Input';
import { InputState } from './InputState';

describe('Input', () => {
    const dongleId = 'DONGLE123';
    const inputNumber = 1;

    it('should create an instance of Input with default state', () => {
        const input = new Input(dongleId, inputNumber);
        expect(input).toBeInstanceOf(Input);
        expect(input.state).toEqual(InputState.NoSignal);
        expect(input.id).toEqual(`${dongleId}-${inputNumber}`);
    });

    it('should create an instance of Input with custom state', () => {
        const customState =  InputState.Signal;
        const input = new Input(dongleId, inputNumber, customState);
        expect(input).toBeInstanceOf(Input);
        expect(input.state).toEqual(customState);
        expect(input.id).toEqual(`${dongleId}-${inputNumber}`);
    });

    it('should update the state of Input', () => {
        const input = new Input(dongleId, inputNumber);
        const newState = InputState.Signal;
        input.state = newState;
        expect(input.state).toEqual(newState);
    });
});