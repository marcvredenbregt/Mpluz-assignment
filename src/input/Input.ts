import { InputState } from './InputState';

export class Input {
  private _state: InputState;
  private _id: string; // dongleId + '-' + inputNumber

  /**
   * Create an input object
   * @param dongleId
   * @param inputNumber
   * @param state
   */
  constructor(
    dongleId: string,
    inputNumber: number,
    state: InputState = InputState.NoSignal,
  ) {
    this._id = `${dongleId}-${inputNumber}`;
    this._state = state;
  }

  /**
   * Get the state of the input
   * @returns
   */
  get state(): InputState {
    return this._state;
  }

  /**
   * Set the state of the input
   */
  set state(state: InputState) {
    this._state = state;
  }

  /**
   * Get the id of the input
   * @returns
   */
  get id(): string {
    return this._id;
  }
}
