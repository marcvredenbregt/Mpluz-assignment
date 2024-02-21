import { getRandomEnum } from './enumUtilities';

enum Color {
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
}

describe('getRandomEnum', () => {
  it('should return a random value from the enum', () => {
    const value = getRandomEnum(Color);
    expect(Object.values(Color)).toContain(value);
  });
});
