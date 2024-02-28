import { Decoder } from '../decoder/Decoder';

export class EventHandler {
  constructor(private decoders: Decoder[]) {}

  handleInputDisconnected(): void {
    console.log(`Handling input disconnected on decoder`);
    this.decoders.forEach((decoder) => {
      decoder.handleNoSignalInputs();
    });
  }
}