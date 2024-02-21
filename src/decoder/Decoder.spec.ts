/* eslint @typescript-eslint/no-magic-numbers: 0 */

import { Decoder } from './Decoder';
import { DongleModel } from '../dongle/DongleModel';
import { Events } from '../event/Events';
import { OutputState } from '../output/OutputState';
import { Encoder } from '../encoder/Encoder';
import { EventEmitter } from 'events';

describe('Decoder', () => {
  let decoder: Decoder;
  const model: DongleModel = DongleModel.MNA440;
  const ip: string = '192.168.0.1';
  const events: Events = Events.getInstance();

  beforeEach(() => {
    decoder = new Decoder(model, ip, events);
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

  it('should handle input disconnected', () => {
    const outputId = 1;
    const encoder = new Encoder(DongleModel.MNA440, '192.168.0.2');
    encoder.connectInput(1);
    const input = encoder.getInput(1);
    decoder.connectOutput(outputId);
    decoder.routeOutput(outputId, input);
    encoder.disconnectInput(1);
    expect(decoder.getOutput(1).routedInput).toBeNull();
  });

  it('should handle input disconnected event', () => {
    // Create an event emitter and spy on the emit method
    const emitter = new EventEmitter();
    const emit = jest.spyOn(emitter, 'emit');
    // Create an encoder and connect an input
    const encoder = new Encoder(DongleModel.MNA440, '192.168.0.2', emitter);
    encoder.connectInput(1);
    // Connect an output and route the input to it
    decoder.connectOutput(1);
    decoder.routeOutput(1, encoder.getInput(1));
    // Disconnect the input
    encoder.disconnectInput(1);
    // Expect the emit method to have been called twice
    expect(emit).toHaveBeenCalledTimes(2);
    // Expect the emit method to have been called with the inputConnected event
    expect(emit).toHaveBeenCalledWith('inputConnected', {
      id: encoder.id,
      input: 1,
    });
    // Expect the emit method to have been called with the inputDisconnected event
    expect(emit).toHaveBeenCalledWith('inputDisconnected', {
      id: encoder.id,
      input: 1,
    });
  });
});
