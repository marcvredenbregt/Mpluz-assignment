# Mpluz\* Assignment

This is a TypeScript project to get you started with your Mpluz\* assignment.

It uses `jest` for testing, `prettier` for formatting, and `typedoc` for document generation.

`npm run lint` will compare your code against the linter settings. This repository is set to use `spaces` for indentation and single quotes for strings.

`npm run test` will run your tests. For a coverage report, use `npm run test:coverage`. And to have tests watch for changes and automatically re-run, use `npm run test:watch`.

`npm run start:watch` will run `App.ts` and re-run on changes.

## Application

### Intro

This typescript codebase is a console application to simulate a Nexxis OR. It works
with a router, encoders and decoders. The encoders have video inputs wich can be routed to a decoder which has outputs. For this to happen the encoder must have a video signal on the input and the decoder must have a destination connected to an output (e.g. monitor).

### Details

### Router

A Nexxis OR can have only one `Router`, this `Router` can have multiple `Dongles` (encoders, decoders and transcoders). An `Encoder` is an input device and a `Decoder` is a output device. A `Transcoder` is used to convert the high bandwidth input stream to a recordable bandwith (not used in this assigment).

### Dongles (Encoders / Decoders)

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

## Assigment

The assignment consists of three parts:

1. A bugfix
2. A new feature
3. A change of handling events

Each part should be a seperate branch on the code base. To start working a new branch do a checkout while creating the branch e.g. `git checkout -b MP-001-Bugfix`. Create a NOTES.md in the root of the project with a description of the steps that will be taken to solve each part, commit each piece of finished code so it is easy to track progess to your choosen solution.

### Bugfix (MP-001)

One of the test is failing. Please find out why and fix the problem.

### New feature (MP-002)

Dongles have a lot of properties, but is it not possible to give them a label for easy reference. Please add the feature to the Dongles so that a label can be added to an Encoder and Decoder.
If provided, the label should be a string of max 15 characters. The label should be accessible via a getter.

example:

```
const encoder = new Encoder(DongleModel.MNA240, '192.168.0.1');
encoder.addLabel('CAMERA 1');

console.log(encoder.label);
-> 'CAMERA 1'
```

### Change of event handling (MP-003)

The event listeners are now initiated in the Outputs via:
`events.on('inputDisconnected', () => this.handleInputDisconnected());`

With this solution there is alot of overhead as can be seen in the console at `OR-1 - Disconnecting`. Each output has its own listener. Please optimize the handling of events so that there is only one eventlistener per `Router`.
