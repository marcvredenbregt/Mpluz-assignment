Steps taken:

1 ANALYZE ROUTING

    Add console logging in App.ts to check input and output state changes.

2 CHECK EVENT HANDLING

    Add console logging to follow inputDisconnected event handling steps.

3 MOVE EVENT HANDLING OUT OF DECODER TO ROUTER

    Options:

    a. Add method handleInputDisconnected() to Router class.

    b. Create seperate EventHandler class.

    Chose option b.: have an event listener in the Router class and a sperate class EventHandler located in the event sub-directory. The class has a method handleInputDisconnected() for handling the inputDisconnect event logic. This class can also be used for handling other types of events in the future. In the Router class, an instance of the EventHandler class is created and the decoders are passed to it.

4 ADJUST TEST FILES

    Moved test for handling input disconnected event from Decoder.spec.ts to new module EventHandler.spec.ts. Test passes, however one test in Decoder.spec.ts 'should handle input disconnected' now fails, while application itself runs ok, handling both 'inputDisconnected' events well.

5 INVESTIGATE FAILING TEST

    Failing test:
    Decoder › should handle input disconnected
    Cause: a single decoder cannot be tested on an inputDisconnected event, since handling of this event has been moved to Router.
    Solution: moved inputDisconnected test from Decoder.spec.ts to Router.spec.tst. This way, an encoder and decoder will first be connected to a router before further testing.

6 CLEAN UP AND TEST

    Removed outcommented code and previously added console logging for debugging.
    Executed npm run lint, test and start. All satisfactory.

