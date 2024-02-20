/* eslint @typescript-eslint/no-magic-numbers: 0 */

import { Events } from './Events';

describe('Events', () => {
    let events: Events;

    beforeEach(() => {
        events = Events.getInstance();
    });

    afterEach(() => {
        // Reset the event listeners after each test
        events.removeAllListeners();
    });

    it('should register and trigger event listeners', () => {
        const listener1 = jest.fn();
        const listener2 = jest.fn();

        events.on('event1', listener1);
        events.on('event2', listener2);

        events.emit('event1');
        events.emit('event2');

        expect(listener1).toHaveBeenCalledTimes(1);
        expect(listener2).toHaveBeenCalledTimes(1);
    });

    it('should pass arguments to event listeners', () => {
        const listener = jest.fn();
        events.on('event', listener);
        events.emit('event', 'arg1', 'arg2');
        expect(listener).toHaveBeenCalledWith('arg1', 'arg2');
    });

    it('should emit an event with to the on listeners', () => {
        const listener = jest.fn();
        events.on('event', listener);
        events.emit('event');
        expect(listener).toHaveBeenCalled();
    });

    it('should remove all event listeners', () => {
        const listener = jest.fn();
        events.on('event', listener);
        events.removeAllListeners('event');
        events.emit('event');
        expect(listener).not.toHaveBeenCalled();
    });
});
