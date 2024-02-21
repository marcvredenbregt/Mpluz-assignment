import { Decoder } from '../decoder/Decoder';
import { DongleModel } from '../dongle/DongleModel';
import { Encoder } from '../encoder/Encoder';
import { getRandomEnum } from './enumUtilities';

/**
 * Generate a random dongle
 * @param ipPrefix
 * @param type
 * @returns
 */
export function generateRandomDongle(
  ipPrefix: string,
  dongleType: 'encoder' | 'decoder',
): Encoder | Decoder {
  const dongleTypes = {
    encoder: Encoder,
    decoder: Decoder,
  };
  const model = getRandomEnum(DongleModel);
  const MAX_IP = 255;
  const ip = `${ipPrefix}${Math.floor(Math.random() * MAX_IP)}`;

  return new dongleTypes[dongleType](model, ip);
}

/**
 * Get a random dongle
 * @param dongles
 * @returns
 * @example
 * const randomDongle = getRandomDongle([encoder1, encoder2, decoder1]);
 */
export function getRandomDongle<T>(dongles: T[]): T {
  const randomIndex = Math.floor(Math.random() * dongles.length);

  return dongles[randomIndex];
}
