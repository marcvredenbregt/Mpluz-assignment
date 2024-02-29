/* eslint @typescript-eslint/no-magic-numbers: 0 */

import { Encoder } from '../encoder/Encoder';
import { Router } from './Router';
import { DongleModel } from '../dongle/DongleModel';
import { Decoder } from '../decoder/Decoder';

const or = {
  valid: 'OR 1',
  invalid: '',
};

const ip = {
  valid: '10.74.25.10',
  invalid: 'abc',
};

describe('Router initializing', () => {
  it('Router should be a class which throws when initiated an invalid OR', () => {
    expect(() => new Router(or.invalid, ip.valid)).toThrow(
      'OR cannot be empty',
    );
  });

  it('Router should be a class which throws when initiated an invalid ip', () => {
    expect(() => new Router(or.valid, ip.invalid)).toThrow('Invalid IP');
  });
  it('Router should return a instance of Router when initiated correctly', () => {
    const router = new Router(or.valid, ip.valid);
    expect(router).toBeInstanceOf(Router);
  });
  it('Router should return the ip when using the getter', () => {
    const router = new Router(or.valid, ip.valid);
    expect(router.ip).toEqual(ip.valid);
  });
  it('Router should return the OR when using the getter', () => {
    const router = new Router(or.valid, ip.valid);
    expect(router.or).toEqual(or.valid);
  });

  it('Router should return an empty array of encoders when initiated', () => {
    const router = new Router(or.valid, ip.valid);
    expect(router.encoders).toEqual([]);
  });

  it('Router should return one encoder when added', () => {
    const router = new Router(or.valid, ip.valid);
    const encoder = new Encoder(DongleModel.MNA240, '10.74.25.1');
    router.addEncoder(encoder);
    expect(router.encoders).toEqual([encoder]);
  });

  it('Router should return an empty array of decoders when initiated', () => {
    const router = new Router(or.valid, ip.valid);
    expect(router.decoders).toEqual([]);
  });

  it('Router should return one decoder when added', () => {
    const router = new Router(or.valid, ip.valid);
    const decoder = new Decoder(DongleModel.MNA240, '10.74.25.2');
    router.addDecoder(decoder);
    expect(router.decoders).toEqual([decoder]);
  });

  it('Router should route an encoder to a decoder', () => {
    const router = new Router(or.valid, ip.valid);
    const encoder = new Encoder(DongleModel.MNA240, '10.74.25.1');
    encoder.connectInput(1);
    router.addEncoder(encoder);
    const decoder = new Decoder(DongleModel.MNA240, '10.74.25.2');
    decoder.connectOutput(1);
    router.addDecoder(decoder);
    router.route(encoder, 1, decoder, 1);
    expect(decoder.getOutput(1).routedInput).toEqual(encoder.getInput(1));
  });

  it('Router should throw when routing an encoder to a decoder with invalid input', () => {
    const router = new Router(or.valid, ip.valid);
    const encoder = new Encoder(DongleModel.MNA240, '10.74.25.1');
    encoder.connectInput(1);
    router.addEncoder(encoder);
    const decoder = new Decoder(DongleModel.MNA240, '10.74.25.2');
    decoder.connectOutput(1);
    router.addDecoder(decoder);
    expect(() => router.route(encoder, 1, decoder, 5)).toThrow(
      'Input or output not found',
    );
  });

  it('Router should remove an encoder when removeEncoder is called', () => {
    const router = new Router(or.valid, ip.valid);
    const encoder = new Encoder(DongleModel.MNA240, '10.74.25.1');
    router.addEncoder(encoder);
    router.removeEncoder(encoder);
    expect(router.encoders).toEqual([]);
  });

  it('Router should remove a decoder when removeDecoder is called', () => {
    const router = new Router(or.valid, ip.valid);
    const decoder = new Decoder(DongleModel.MNA240, '10.74.25.2');
    router.addDecoder(decoder);
    router.removeDecoder(decoder);
    expect(router.decoders).toEqual([]);
  });

  it('should handle input disconnected', () => {
    const router = new Router(or.valid, ip.valid);
    const encoder = new Encoder(DongleModel.MNA240, '10.74.25.1');
    router.addEncoder(encoder);
    const decoder = new Decoder(DongleModel.MNA240, '10.74.25.2');
    router.addDecoder(decoder);
    const outputId = 1;
    encoder.connectInput(1);
    const input = encoder.getInput(1);
    decoder.connectOutput(outputId);
    decoder.routeOutput(outputId, input);
    encoder.disconnectInput(1);
    expect(decoder.getOutput(1).routedInput).toBeNull();
  });
});
