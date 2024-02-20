import { InputManager } from './InputManager';
import { Input } from './Input';
import { InputState } from './InputState';

describe('InputManager', () => {
    const encoderId = 'SOURCE123';
    const inputCount = 2;
    let inputManager: InputManager;

    beforeEach(() => {
        inputManager = new InputManager(encoderId, inputCount);
    });

    it('should create an instance of InputManager with specified inputs', () => {
        expect(inputManager).toBeInstanceOf(InputManager);
        expect(inputManager.length).toEqual(inputCount);
    });

    it('should get an input by id', () => {
        const inputId = 1;
        const input = inputManager.getInput(inputId);
        expect(input).toBeInstanceOf(Input);
        expect(input.id).toEqual(`${encoderId}-${inputId}`);
    });

    it('should connect an input', () => {
        const inputId = 1;
        inputManager.connectInput(inputId);
        const input = inputManager.getInput(inputId);
        expect(input.state).toEqual(InputState.Signal);
    });

    it('should disconnect an input', () => {
        const inputId = 1;
        inputManager.disconnectInput(inputId);
        const input = inputManager.getInput(inputId);
        expect(input.state).toEqual(InputState.NoSignal);
    });

    it('should find an input by id', () => {
        const inputId = 1;
        const input = inputManager.getInput(inputId);
        const foundInput = inputManager.findInputId(input.id);
        expect(foundInput).toBe(input);
    });

    it('should not find an input by an invalid id', () => {
        const foundInput = inputManager.findInputId("234");
        expect(foundInput).toBeNull();
    });

    it('should throw an error when connecting a non-existing input', () => {
        const nonExistingInputId = 5;
        expect(() => {
            inputManager.connectInput(nonExistingInputId);
        }).toThrow('Input not found');
    });

    it('should throw an error when disconnecting a non-existing input', () => {
        const nonExistingInputId = 5;
        expect(() => {
            inputManager.disconnectInput(nonExistingInputId);
        }).toThrow('Input not found');
    });
});