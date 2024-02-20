# Mpluz* Assignment

This is a lightweight TypeScript project to get you started with your Mpluz* assignment.

It uses `jest` for testing, `prettier` for formatting, and `typedoc` for document generation.

`npm run lint` will compare your code against the linter settings. This repository is set to use `spaces` for indentation and single quotes for strings.

`npm run test` will run your tests. For a coverage report, use `npm run test:coverage`. And to have tests watch for changes and automatically re-run, use `npm run test:watch`.

`npm run start:watch` will run `App.ts` and re-run on changes. 

## Application

This typescript codebase is a console application to simulate a Nexxis OR. It works 
with a Router, Encoder(s) and Decoder(s).

A Nexxis OR can have only one `Router`, this `Router` can have multiple `Dongles` (encoders, decoders and transcoders). An `Encoder` is an input device....... 

An `Encoder` and `Decoder` can have 1 or 2 connectors (inputs or outputs) depending on the model.   

The connectors of an `Encoder` can be connected to an image source and it's `InputState` will change from `NoSignal` to `Signal`.

The connectors of an `Decoder` can be connected to an image source and it's `OuputState` will change from `Disconnected` to `Connected`.

