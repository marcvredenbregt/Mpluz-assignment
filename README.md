# Mpluz* Assignment

This is a TypeScript project to get you started with your Mpluz* assignment.

It uses `jest` for testing, `prettier` for formatting, and `typedoc` for document generation.

`npm run lint` will compare your code against the linter settings. This repository is set to use `spaces` for indentation and single quotes for strings.

`npm run test` will run your tests. For a coverage report, use `npm run test:coverage`. And to have tests watch for changes and automatically re-run, use `npm run test:watch`.

`npm run start:watch` will run `App.ts` and re-run on changes. 

## Application

This typescript codebase is a console application to simulate a Nexxis OR. It works 
with a Router, Encoder(s) and Decoder(s).

A Nexxis OR can have only one `Router`, this `Router` can have multiple `Dongles` (encoders, decoders and transcoders). An `Encoder` is an input device and a `Decoder` is a output device. A `Transcoder` is used to convert the high bandwidth input stream to a recordable bandwith. 

A `Dongle` can have 1 or 2 connectors (inputs or outputs) depending on the model.   

The `Dogle` of type `Encoder` can: 
1. connect an image source to an `Input` and it's `InputState` will change from `NoSignal` to `Signal`
2. disconnected an image source from an `Input` and it's `InputState` will change from `Signal` to `NoSignal`
3. emit an event when an image source is disconnected

The `Dogle` of type `Decoder` can: 
1. connected an image destination (e.g. monitor) to an `Output` and it's `OuputState` will change from `Disconnected` to `Connected`
2. disconnected a destination (e.g. monitor) from an `Output` and it's `OuputState` will change from `Connected` to `Disconnected`
3. routed an `Input` of an `Encoder` to an `Ouput`
4. unrouted an `Input` of an `Encoder` to an `Ouput`
5. handle an `Input` disconnected event to unroute disconnected `Input` from `Output`(s)



