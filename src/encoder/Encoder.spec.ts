/* eslint @typescript-eslint/no-magic-numbers: 0 */

import { Encoder } from './Encoder';
import { DongleModel } from '../dongle/DongleModel';
import { InputState } from '../input/InputState';

describe('Encoder', () => {
  let encoder: Encoder;

  beforeEach(() => {
    encoder = new Encoder(DongleModel.MNA240, '192.168.0.1');
  });

  it('should connect an input', () => {
    const inputId = 1;
    encoder.connectInput(inputId);
    const input = encoder.getInput(inputId);
    expect(input).toBeDefined();
  });

  it('should disconnect an input', () => {
    const inputId = 1;
    encoder.connectInput(inputId);
    encoder.disconnectInput(inputId);
    const input = encoder.getInput(inputId);
    expect(input.state).toEqual(InputState.NoSignal);
  });

  it('should find an input by ID', () => {
    encoder.connectInput(1);
    const inputId = `${encoder.id}-1`;
    const foundInput = encoder.findInputId(inputId);
    expect(foundInput).toEqual(encoder.getInput(1));
  });

  it('should return the correct input count', () => {
    expect(encoder.inputCount).toBe(2);
  });
});
