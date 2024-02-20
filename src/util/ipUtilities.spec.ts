import { isValidIp } from './IpUtilities';

describe('isValidIp', () => {
    it('should return true for valid IPs', () => {
        expect(isValidIp('192.168.1.1')).toBe(true);
        expect(isValidIp('255.255.255.255')).toBe(true);
        expect(isValidIp('0.0.0.0')).toBe(true);
    });

    it('should return false for invalid IPs', () => {
        expect(isValidIp('256.0.0.0')).toBe(false);
        expect(isValidIp('192.168.1')).toBe(false);
        expect(isValidIp('192.168.1.1.1')).toBe(false);
        expect(isValidIp('abc.def.ghi.jkl')).toBe(false);
    });
});