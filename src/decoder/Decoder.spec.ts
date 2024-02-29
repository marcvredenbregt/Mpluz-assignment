/* eslint @typescript-eslint/no-magic-numbers: 0 */

import { Decoder } from './Decoder';
import { DongleModel } from '../dongle/DongleModel';
import { OutputState } from '../output/OutputState';
import { Encoder } from '../encoder/Encoder';

describe('Decoder', () => {
  let decoder: Decoder;
  const model: DongleModel = DongleModel.MNA440;
  const ip: string = '192.168.0.1';

  beforeEach(() => {
    decoder = new Decoder(model, ip);
  });

  it('should connect output', () => {
    const outputId = 1;
    decoder.connectOutput(outputId);
    const output = decoder.getOutput(outputId);
    expect(output.state).toBe(OutputState.Connected);
  });

  it('should disconnect output', () => {
    const outputId = 1;
    decoder.connectOutput(outputId);
    decoder.disconnectOutput(outputId);
    const output = decoder.getOutput(outputId);
    expect(output.state).toBe(OutputState.Disconnected);
  });

  it('should route output to input', () => {
    const outputId = 1;
    const encoder = new Encoder(DongleModel.MNA440, '192.168.0.2');
    encoder.connectInput(1);
    const input = encoder.getInput(1);
    decoder.connectOutput(outputId);
    decoder.routeOutput(outputId, input);
    const output = decoder.getOutput(outputId);
    expect(output.routedInput).toBe(input);
  });

  it('should unroute output', () => {
    const outputId = 1;
    const encoder = new Encoder(DongleModel.MNA440, '192.168.0.2');
    encoder.connectInput(1);
    const input = encoder.getInput(1);
    decoder.connectOutput(outputId);
    decoder.routeOutput(outputId, input);
    decoder.unrouteOutput(outputId);
    const output = decoder.getOutput(outputId);
    expect(output.routedInput).toBeNull();
  });
});
