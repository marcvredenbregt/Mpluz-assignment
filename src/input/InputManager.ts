import { Input } from './Input';
import { InputState } from './InputState';
const ZERO_INDEX_CORRECTION = 1;

export class InputManager {
  private readonly inputs: Input[] = [];

  constructor(encoderId: string, inputCount: number) {
    this.createInputs(inputCount, encoderId);
  }

  /**
   * Get the input object
   * @param id
   * @returns
   */
  getInput(id: number): Input {
    return this.inputs[id - ZERO_INDEX_CORRECTION];
  }

  /**
   * Get all inputs
   * @returns
   */
  get length(): number {
    return this.inputs.length;
  }

  /**
   * Connect an input
   * @param id
   */
  connectInput(id: number): void {
    const input = this.inputs[id - ZERO_INDEX_CORRECTION];
    if (input) {
      input.state = InputState.Signal;
    } else {
      throw new Error('Input not found');
    }
  }

  /**
   * Disconnect an input
   * @param id
   */
  disconnectInput(id: number): void {
    const input = this.inputs[id - ZERO_INDEX_CORRECTION];
    if (input) {
      input.state = InputState.NoSignal;
    } else {
      throw new Error('Input not found');
    }
  }

  /**
   * Find an input by inputId
   * @param inputId
   * @returns
   */
  findInputId(inputId: string): Input | null {
    return this.inputs.find((input) => input.id === inputId) || null;
  }

  /**
   * Create inputs for an encoder (by count and encoderId)
   * @param count
   * @param encoderId
   */
  private createInputs(count: number, encoderId: string): void {
    for (let i = 1; i <= count; i++) {
      this.inputs.push(new Input(encoderId, i));
    }
  }
}
