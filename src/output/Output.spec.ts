/* eslint @typescript-eslint/no-magic-numbers: 0 */

import { Output } from "./Output";
import { OutputState } from "./OutputState";
import { Encoder } from "../encoder/Encoder";
import { DongleModel } from "../dongle/DongleModel";

describe("Output", () => {
    let output: Output;

    beforeEach(() => {
        output = new Output("dongle1", 1);
    });

    it("should have the correct initial state", () => {
        expect(output.state).toBe(OutputState.Disconnected);
    });

    it("should have the correct initial routed input", () => {
        expect(output.routedInput).toBeNull();
    });

    it("should have the correct id", () => {
        expect(output.id).toBe("dongle1-1");
    });

    it("should be able to set the state", () => {
        output.state = OutputState.Connected;
        expect(output.state).toBe(OutputState.Connected);
    });

    it("should be able to route an input", () => {
        const encoder = new Encoder(DongleModel.MNA120, '10.74.25.11');
        encoder.connectInput(1);
        const input = encoder.getInput(1);
        output.route(input);
        expect(output.routedInput).toBe(input);
    });

    it("should throw when routing an input with no signal", () => {
        const encoder = new Encoder(DongleModel.MNA120, '10.74.25.11');
        const input = encoder.getInput(1);
        expect(() => output.route(input)).toThrow('Input has no signal');
    });

    it("should be able to unroute the input", () => {
        const encoder = new Encoder(DongleModel.MNA120, '10.74.25.11');
        encoder.connectInput(1);
        const input = encoder.getInput(1);
        output.route(input);
        output.unroute();
        expect(output.routedInput).toBeNull();
    });

});
