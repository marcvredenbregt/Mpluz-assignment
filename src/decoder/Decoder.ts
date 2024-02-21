import { Dongle } from '../dongle/Dongle';
import { DongleModel } from '../dongle/DongleModel';
import { DongleType } from '../dongle/DongleType';
import { Input } from '../input/Input';
import { Output } from '../output/Output';
import { Events } from '../event/Events';
import { OutputManager } from '../output/OutputManager';

export class Decoder extends Dongle {
  private readonly outputManager: OutputManager;

  constructor(
    model: DongleModel,
    ip: string,
    events: Events = Events.getInstance(),
  ) {
    super(model, DongleType.Decoder, ip);
    this.outputManager = new OutputManager(this.id, this.connectors);
    events.on('inputDisconnected', () => this.handleInputDisconnected());
  }

  /**
   * Connect a destination (e.g. monitor) to an output
   * @param id
   */
  connectOutput(id: number): void {
    this.outputManager.connectOutput(id);
  }

  /**
   * Disconnect a destination (e.g. monitor) from an output
   * @param id
   */
  disconnectOutput(id: number): void {
    this.outputManager.disconnectOutput(id);
  }

  /**
   * Get the output by id
   * @param id
   * @returns
   */
  getOutput(id: number): Output {
    return this.outputManager.getOutput(id);
  }

  /**
   * Route an input to an output
   * @param id
   * @param input
   */
  routeOutput(id: number, input: Input): void {
    this.outputManager.routeOutput(id, input);
  }

  /**
   * Unroute an input from an output
   * @param id
   */
  unrouteOutput(id: number): void {
    this.outputManager.unrouteOutput(id);
  }

  /**
   * Handle input disconnected event
   * @param _event
   */
  private handleInputDisconnected(): void {
    console.log(`Handling input disconnected on decoder`);
    this.outputManager.unrouteNoSignalInputs();
  }
}
