/* eslint @typescript-eslint/no-magic-numbers: 0 */

import { Decoder } from '../decoder/Decoder';
import { DongleModel } from '../dongle/DongleModel';
import { Encoder } from '../encoder/Encoder';
import { EventEmitter } from 'events';

describe('EventHandler', () => {
  it('should handle input disconnected event', () => {
    // Create an event emitter and spy on the emit method
    const emitter = new EventEmitter();
    const emit = jest.spyOn(emitter, 'emit');
    // Create an encoder and connect an input
    const encoder = new Encoder(DongleModel.MNA440, '192.168.0.1', emitter);
    encoder.connectInput(1);
    // Create a decoder, connect an output and route the input to it
    const decoder = new Decoder(DongleModel.MNA440, '192.168.0.2');
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

