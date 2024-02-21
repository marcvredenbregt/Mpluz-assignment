import { Input } from '../input/Input';
import { Output } from './Output';
import { OutputState } from './OutputState';
import { InputState } from '../input/InputState';
const ZERO_INDEX_CORRECTION = 1;

export class OutputManager {
  private readonly outputs: Output[] = [];

  constructor(decoderId: string, outputCount: number) {
    this.createOutputs(outputCount, decoderId);
  }

  /**
   * Get the output object
   * @param id
   * @returns
   */
  connectOutput(id: number): void {
    const output = this.outputs[id - ZERO_INDEX_CORRECTION];
    if (!output) {
      throw new Error('Output not found');
    }
    output.state = OutputState.Connected;
  }

  /**
   * Connect an output
   * @param id
   */
  disconnectOutput(id: number): void {
    const output = this.outputs[id - ZERO_INDEX_CORRECTION];
    if (!output) {
      throw new Error('Output not found');
    }
    output.state = OutputState.Disconnected;
  }

  /**
   * Get the output object
   * @param id
   * @returns
   */
  getOutput(id: number): Output {
    return this.outputs[id - ZERO_INDEX_CORRECTION];
  }

  /**
   * Route an input to the output
   * @param id
   * @param input
   * @returns
   */
  routeOutput(id: number, input: Input): void {
    const output = this.outputs[id - ZERO_INDEX_CORRECTION];
    if (!output) {
      throw new Error('Output not found');
    }
    if (output.state !== OutputState.Connected) {
      throw new Error('Output is not connected');
    }
    output.route(input);
  }

  /**
   * Unroute an input from the output
   * @param id
   */
  unrouteOutput(id: number): void {
    const output = this.outputs[id - ZERO_INDEX_CORRECTION];
    if (output) {
      output.unroute();
    }
  }

  /**
   * Unroute inputs which have no signal from outputs
   */
  unrouteNoSignalInputs(): void {
    this.outputs.forEach((output) => {
      if (output.routedInput?.state === InputState.NoSignal) {
        console.log(
          ` - unrouting output ${output.id} because input has no signal`,
        );
        output.unroute();
      }
    });
  }

  /**
   * Create outputs for a decoder (by count and decoderId)
   * @param count
   * @param decoderId
   * @returns
   */
  private createOutputs(count: number, decoderId: string): void {
    for (let i = 1; i <= count; i++) {
      this.outputs.push(new Output(decoderId, i));
    }
  }
}
