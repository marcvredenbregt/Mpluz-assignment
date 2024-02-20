import { Dongle } from "../dongle/Dongle";
import { DongleModel } from "../dongle/DongleModel";
import { DongleType } from "../dongle/DongleType";
import { Input } from "../input/Input";
import { Events } from "../event/Events";
import { InputManager } from "../input/InputManager";

export class Encoder extends Dongle {
    private readonly inputManager: InputManager;

    constructor(
        model: DongleModel, 
        ip: string,
        private events: Events = Events.getInstance()
    ) {
        super(model, DongleType.Encoder, ip);
        this.inputManager = new InputManager(this.id, this.connectors);
    }

    connectInput(id: number): void {
        this.inputManager.connectInput(id);
        this.events.emit('inputConnected', { id: this.id, input: id });
    }

    disconnectInput(id: number): void {
        this.inputManager.disconnectInput(id);
        this.events.emit('inputDisconnected', { id: this.id, input: id });
    }

    getInput(id: number): Input {
        return this.inputManager.getInput(id);
    }

    findInputId(inputId: string): Input | null {
        return this.inputManager.findInputId(inputId);
    } 

    get inputCount(): number {
        return this.inputManager.length;
    }
}

