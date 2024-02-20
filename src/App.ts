/* eslint @typescript-eslint/no-magic-numbers: 0 */

import { DongleModel } from './dongle/DongleModel';
import { Router } from './router/Router';
import { Decoder } from './decoder/Decoder';
import { Encoder } from './encoder/Encoder';
import { generateRandomDongle } from './util/randomDongle';

const delayAndClear = async (delay: number): Promise<boolean> => new Promise(
    (resolve) => {
        setTimeout(() => {
            console.clear();
            resolve(true);
        }, delay * 1000);
    }
);

export const App = async (delayBetweenActions: number) => {

    console.clear();

    const ipPrefix = '10.74.25.';
    const OR1 = new Router('OR1', `${ipPrefix  }10`);

    // generate 8 random encoders and 6 decoders
    const encoders = Array.from({ length: 7 }, () => generateRandomDongle(ipPrefix, 'encoder')) as Encoder[];
    const decoders = Array.from({ length: 6 }, () => generateRandomDongle(ipPrefix, 'decoder')) as Decoder[];

    // create last encoder with 2 inputs
    encoders.push(new Encoder(DongleModel.MNA440, `${ipPrefix  }111`));

    console.log(`==============================================================================================`);
    console.log(`OR-1 - Initial state - connecting encoders and decoders to the router`);
    console.log(`==============================================================================================`);
    console.log(` - Add 8 encoders and 6 decoders to OR1`);
    encoders.forEach(encoder => OR1.addEncoder(encoder));
    decoders.forEach(decoder => OR1.addDecoder(decoder));

    console.log(` - Connect source to input 1 of encoder 1 model ${encoders[0].model}`);
    encoders[0].connectInput(1);
    console.log(` - Connect source to input 1 of encoder 3 model ${encoders[2].model}`);
    encoders[2].connectInput(1);
    console.log(` - Connect source to input 1 of encoder 5 model ${encoders[4].model}`);
    encoders[4].connectInput(1);
    console.log(` - Connect sources to inputs of encoder 8 model ${encoders[7].model}`);
    encoders[7].connectInput(1);
    encoders[7].connectInput(2);

    console.log(` - Connect monitor to output 1 of decoder 1 model ${decoders[0].model}`);
    decoders[0].connectOutput(1);
    console.log(` - Connect monitor to output 1 of decoder 2 model ${decoders[1].model}`);
    decoders[1].connectOutput(1);
    console.log(` - Connect monitor to output 1 of decoder 3 model ${decoders[2].model}`);
    decoders[2].connectOutput(1);
    await delayAndClear(delayBetweenActions);

    console.log(`==============================================================================================`);
    console.log(`OR-1 - Routing`);
    console.log(`==============================================================================================`);

    console.log(` - Routed encoder 1 input 1 to decoder 1 output 1`);
    OR1.route(encoders[0], 1, decoders[0], 1);
    console.log(` - Routed encoder 3 input 1 to decoder 2 output 1`);
    OR1.route(encoders[2], 1, decoders[1], 1);
    console.log(` - Routed encoder 8 input 2 to decoder 3 output 1`);
    OR1.route(encoders[7], 2, decoders[2], 1);
    console.log(` - Routed encoder 8 input 1 to decoder 3 output 1`);
    OR1.route(encoders[7], 1, decoders[3], 1);
    console.log(` - Routed encoder 8 input 2 to decoder 3 output 1`);
    OR1.route(encoders[7], 2, decoders[4], 1);
    await delayAndClear(delayBetweenActions);


    console.log(`==============================================================================================`);
    console.log(`OR-1 - Re-routing`);
    console.log(`==============================================================================================`);

    console.log(` - Routed encoder 5 input 1 to decoder 1 output 1`);
    OR1.route(encoders[4], 1, decoders[0], 1);
    console.log(` - Routed encoder 1 input 1 to decoder 2 output 1`);
    OR1.route(encoders[0], 1, decoders[1], 1);
    await delayAndClear(delayBetweenActions);

    console.log(`==============================================================================================`);
    console.log(`OR-1 - Disconnecting`);
    console.log(`==============================================================================================`);

    console.log(`Disconnect encoder 8 input 1`);
    encoders[7].disconnectInput(1);

    console.log(`---------------------------------------------------------------------------------------------`);

    console.log(`Disconnect encoder 8 input 2`);
    encoders[7].disconnectInput(2);
    await delayAndClear(delayBetweenActions);

    return 'success';
}

App(20).then(console.log).catch(console.error);