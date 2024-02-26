import { Dongle } from '../dongle/Dongle';
import { DongleModel } from '../dongle/DongleModel';
import { DongleType } from '../dongle/DongleType';
import { Input } from '../input/Input';
import { Events } from '../event/Events';
import { InputManager } from '../input/InputManager';

export class Encoder extends Dongle {
  private readonly inputManager: InputManager;

  /**
   * Create an encoder object with a model and ip
   * @param model
   * @param ip
   * @param events
   * @example
   * const encoder = new Encoder(DongleModel.MNA420, '10.74.25.222');
   */
  constructor(
    model: DongleModel,
    ip: string,
    label?: string,
    private events: Events = Events.getInstance(),
  ) {
    super(model, DongleType.Encoder, ip, label !== undefined ? label : null);
    this.inputManager = new InputManager(this.id, this.connectors);
  }

  /**
   * Connect an input to the encoder
   * @param id
   */
  connectInput(id: number): void {
    this.inputManager.connectInput(id);
    this.events.emit('inputConnected', { id: this.id, input: id });
  }

  /**
   * Disconnect an input from the encoder
   * @param id
   */
  disconnectInput(id: number): void {
    this.inputManager.disconnectInput(id);
    this.events.emit('inputDisconnected', { id: this.id, input: id });
  }

  /**
   * Turn off the encoder and disconnect
   * @returns
   */
  turnOff(): void {
    for (let i = 1; i <= this.inputCount; i++) {
      this.inputManager.disconnectInput(i);
    }
  }

  /*
   * Get the input object
   * @param id
   * @returns
   */
  getInput(id: number): Input {
    return this.inputManager.getInput(id);
  }

  /**
   * Find an input by its inputId
   * @param inputId
   * @returns
   */
  findInputId(inputId: string): Input | null {
    return this.inputManager.findInputId(inputId);
  }

  /**
   * Get all inputs
   * @returns
   */
  get inputCount(): number {
    return this.inputManager.length;
  }
}
