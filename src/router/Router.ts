import { isValidIp } from "../util/IpUtilities";
import { Encoder } from "../encoder/Encoder";
import { Decoder } from "../decoder/Decoder";

export class Router {
    private _encoders: Encoder[] = [];
    private _decoders: Decoder[] = [];

    constructor(
        private _or: string, 
        private _ip: string,
    ) {
        if (!isValidIp(_ip)) {
            throw new Error('Invalid IP');
        }
        if (_or === '') {
            throw new Error('OR cannot be empty');
        }
    }   

    get ip(): string {
        return this._ip;
    }

    get or(): string {
        return this._or;
    }
    
    get encoders(): Encoder[] {
        return this._encoders;
    }

    get decoders(): Decoder[] {
        return this._decoders;
    }

    addEncoder(encoder: Encoder): void {
        this._encoders.push(encoder);
    }


    addDecoder(decoder: Decoder): void {
        this._decoders.push(decoder);
    }

    route(encoder: Encoder, inputId: number, decoder: Decoder, outputId: number): void {
        const input = encoder.getInput(inputId);
        const output = decoder.getOutput(outputId);
        if (input && output) {
            output.route(input);
        }
        else {
            throw new Error('Input or output not found');
        }
    }
}