/* eslint @typescript-eslint/no-magic-numbers: 0 */

import { OutputManager } from './OutputManager';
import { Output } from './Output';
import { Encoder } from '../encoder/Encoder';
import { DongleModel } from '../dongle/DongleModel';

describe('OutputManager', () => {
  let outputManager: OutputManager;

  beforeEach(() => {
    outputManager = new OutputManager('decoderId', 3);
  });

  it('should connect an output', () => {
    outputManager.connectOutput(1);
    expect(outputManager.getOutput(1)).toBeInstanceOf(Output);
  });

  it('should throw when connecting an output with an invalid id', () => {
    expect(() => outputManager.connectOutput(4)).toThrow('Output not found');
  });

  it('should disconnect an output', () => {
    outputManager.connectOutput(1);
    outputManager.disconnectOutput(1);
    expect(outputManager.getOutput(1).state).toBe(0);
  });

  it('should throw when disconnecting an output with an invalid id', () => {
    expect(() => outputManager.disconnectOutput(4)).toThrow('Output not found');
  });

  it('should route an input to an output', () => {
    const encoder = new Encoder(DongleModel.MNA120, '10.74.25.11', 'CAMERA 1');
    encoder.connectInput(1);
    const input = encoder.getInput(1);
    outputManager.connectOutput(1);
    outputManager.routeOutput(1, input);
    expect(outputManager.getOutput(1).routedInput).toBe(input);
  });

  it('should throw when routing an input to an output with an invalid id', () => {
    const VALID_INPUT = 1;
    const VALID_OUTPUT = 1;
    const INVALID_OUTPUT = 4;
    const encoder = new Encoder(DongleModel.MNA120, '10.74.25.11');
    encoder.connectInput(VALID_INPUT);
    const input = encoder.getInput(VALID_INPUT);
    outputManager.connectOutput(VALID_OUTPUT);
    expect(() => outputManager.routeOutput(INVALID_OUTPUT, input)).toThrow(
      'Output not found',
    );
  });

  it('should throw when routing an input to an output that is not connected', () => {
    const encoder = new Encoder(DongleModel.MNA120, '10.74.25.11');
    encoder.connectInput(1);
    const input = encoder.getInput(1);
    expect(() => outputManager.routeOutput(1, input)).toThrow(
      'Output is not connected',
    );
  });

  it('should unroute an output from an input', () => {
    const encoder = new Encoder(DongleModel.MNA120, '10.74.25.11');
    encoder.connectInput(1);
    const input = encoder.getInput(1);
    outputManager.connectOutput(1);
    outputManager.routeOutput(1, input);
    outputManager.unrouteOutput(1);
    expect(outputManager.getOutput(1).routedInput).toBe(null);
  });

  it('should unroute all outputs with no signal inputs', () => {
    const encoder = new Encoder(DongleModel.MNA120, '10.74.25.11');
    encoder.connectInput(1);
    encoder.connectInput(2);
    const input1 = encoder.getInput(1);
    const input2 = encoder.getInput(2);
    outputManager.connectOutput(1);
    outputManager.connectOutput(2);
    outputManager.routeOutput(1, input1);
    outputManager.routeOutput(2, input2);
    encoder.disconnectInput(1);
    outputManager.unrouteNoSignalInputs();
    expect(outputManager.getOutput(1).routedInput).toBe(null);
    expect(outputManager.getOutput(2).routedInput).toBe(input2);
  });
});
