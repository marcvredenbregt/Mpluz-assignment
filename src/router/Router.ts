import { isValidIp } from '../util/IpUtilities';
import { Encoder } from '../encoder/Encoder';
import { Decoder } from '../decoder/Decoder';
import { Events } from '../event/Events';
import { EventHandler } from '../event/EventHandler';

export class Router {
  private _encoders: Encoder[] = [];
  private _decoders: Decoder[] = [];
  private disconnectHandler: EventHandler;

  constructor(
    private _or: string,
    private _ip: string,
    events = Events.getInstance(),
    ) {
    if (!isValidIp(_ip)) {
      throw new Error('Invalid IP');
    }
    if (_or === '') {
      throw new Error('OR cannot be empty');
    }
    this.disconnectHandler = new EventHandler(
      this._decoders
    );
    events.on('inputDisconnected', () => this.disconnectHandler.handleInputDisconnected());
  }

  /**
   * Get the ip of the router
   */
  get ip(): string {
    return this._ip;
  }

  /**
   * Get the OR of the router
   */
  get or(): string {
    return this._or;
  }

  /**
   * Get the encoders
   */
  get encoders(): Encoder[] {
    return this._encoders;
  }

  /**
   * Get the decoders
   */
  get decoders(): Decoder[] {
    return this._decoders;
  }

  /**
   * Add an encoder to the router
   */
  addEncoder(encoder: Encoder): void {
    this._encoders.push(encoder);
  }

  /**
   * Add a decoder to the router
   */
  addDecoder(decoder: Decoder): void {
    this._decoders.push(decoder);
  }

  /**
   * Remove an encoder from the router
   */
  removeEncoder(encoder: Encoder): void {
    this._encoders = this._encoders.filter((e) => e.id !== encoder.id);
  }

  /**
   * Remove a decoder from the router
   */
  removeDecoder(decoder: Decoder): void {
    this._decoders = this._decoders.filter((d) => d.id !== decoder.id);
  }

  /**
   * Route an encoder input to a decoder output
   * @param encoder
   * @param inputId
   * @param decoder
   * @param outputId
   */
  route(
    encoder: Encoder,
    inputId: number,
    decoder: Decoder,
    outputId: number,
  ): void {
    const input = encoder.getInput(inputId);
    const output = decoder.getOutput(outputId);
    if (input && output) {
      output.route(input);
    } else {
      throw new Error('Input or output not found');
    }
  }
}
