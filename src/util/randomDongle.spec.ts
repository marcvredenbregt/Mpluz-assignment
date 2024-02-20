import { generateRandomDongle, getRandomDongle } from "./randomDongle";
import { Decoder } from "../decoder/Decoder";
import { Encoder } from "../encoder/Encoder";
import { DongleModel } from "../dongle/DongleModel";

describe("generateRandomDongle", () => {
    it("should generate a random encoder", () => {
        const ipPrefix = "192.168.0.";
        const type = "encoder";
        const dongle = generateRandomDongle(ipPrefix, type);
        expect(dongle).toBeInstanceOf(Encoder);
        expect(dongle.ip).toMatch(/^192\.168\.0\.\d{1,3}$/);
    });

    it("should generate a random decoder", () => {
        const ipPrefix = "192.168.0.";
        const type = "decoder";
        const dongle = generateRandomDongle(ipPrefix, type);
        expect(dongle).toBeInstanceOf(Decoder);
        expect(dongle.ip).toMatch(/^192\.168\.0\.\d{1,3}$/);
    });
});

describe("getRandomDongle", () => {
    it("should return a random dongle from the given array", () => {
        const dongles: Encoder[] = [
            new Encoder(DongleModel.MNA240, "192.168.0.1"),
            new Encoder(DongleModel.MNA120, "192.168.0.2"),
            new Encoder(DongleModel.MNA420, "192.168.0.3"),
            new Encoder(DongleModel.MNA240, "192.168.0.4"),
        ];
        const randomDongle = getRandomDongle(dongles);
        expect(dongles).toContain(randomDongle);
    });
});
