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

  connectOutput(id: number): void {
    const output = this.outputs[id - ZERO_INDEX_CORRECTION];
    if (!output) {
      throw new Error('Output not found');
    }
    output.state = OutputState.Connected;
  }

  disconnectOutput(id: number): void {
    const output = this.outputs[id - ZERO_INDEX_CORRECTION];
    if (!output) {
      throw new Error('Output not found');
    }
    output.state = OutputState.Disconnected;
  }

  getOutput(id: number): Output {
    return this.outputs[id - ZERO_INDEX_CORRECTION];
  }

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

  unrouteOutput(id: number): void {
    const output = this.outputs[id - ZERO_INDEX_CORRECTION];
    if (output) {
      output.unroute();
    }
  }

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

  private createOutputs(count: number, decoderId: string): void {
    for (let i = 1; i <= count; i++) {
      this.outputs.push(new Output(decoderId, i));
    }
  }
}
