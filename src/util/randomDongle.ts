import { Decoder } from '../decoder/Decoder';
import { DongleModel } from '../dongle/DongleModel';
import { Encoder } from '../encoder/Encoder';
import { getRandomEnum } from './enumUtilities';

export function generateRandomDongle(
  ipPrefix: string,
  type: 'encoder' | 'decoder',
): Encoder | Decoder {
  const types = {
    encoder: Encoder,
    decoder: Decoder,
  };
  const model = getRandomEnum(DongleModel);
  const MAX_IP = 255;
  const ip = `${ipPrefix}${Math.floor(Math.random() * MAX_IP)}`;

  return new types[type](model, ip);
}

export function getRandomDongle<T>(dongles: T[]): T {
  const randomIndex = Math.floor(Math.random() * dongles.length);

  return dongles[randomIndex];
}
