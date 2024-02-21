import { Input } from '../input/Input';
import { InputState } from '../input/InputState';
import { OutputState } from './OutputState';

export class Output {
  private _state: OutputState;
  private _id: string; // dongleId + '-' + outputNumber
  private _routedInput: Input | null = null;

  constructor(
    dongleId: string,
    outputNumber: number,
    state: OutputState = OutputState.Disconnected,
  ) {
    this._id = `${dongleId}-${outputNumber}`;
    this._state = state;
  }

  /**
   * Get the state of the output
   * @returns
   */
  get state(): OutputState {
    return this._state;
  }

  /**
   * Set the state of the output
   * @param state
   */
  set state(state: OutputState) {
    this._state = state;
  }

  /**
   * Get the routed input
   * @returns
   */
  get routedInput(): Input | null {
    return this._routedInput;
  }

  /**
   * Route an input to the output
   * @param input
   * @throws {Error} if input has no signal
   */
  route(input: Input): void {
    // Check if input has signal
    if (input.state !== InputState.Signal) {
      throw new Error('Input has no signal');
    }
    this._routedInput = input;
  }

  /**
   * Unroute the input from the output
   */
  unroute(): void {
    this._routedInput = null;
  }

  /**
   * Get the id of the output
   * @returns
   */
  get id(): string {
    return this._id;
  }
}
