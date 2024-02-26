Steps taken:

Run test with 'npm run test' command.

Check file Encoder.spec.ts line 47 on failed test.

Failure caused by an InputState not equal to 'NoSignal' after execution of method encoder.turnoff().

Check turnoff() method in Encoder class. Found that this method only disconnects one input.

Adjust turnoff() method to disconnect all inputs.

Run test again without failures.

