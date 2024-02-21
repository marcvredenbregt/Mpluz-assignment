import { EventEmitter } from 'events';

export class Events {
  // create a singleton event emitter
  private static instance: EventEmitter;
  static getInstance(): EventEmitter {
    if (!Events.instance) {
      Events.instance = new EventEmitter();
      EventEmitter.defaultMaxListeners = 200;
    }

    return Events.instance;
  }

  private constructor() {
    // private constructor to prevent instantiation
  }

  /**
   * Add a listener to the event emitter
   * @param event
   * @param listener
   */
  on(event: string, listener: (...args: unknown[]) => void): void {
    Events.getInstance().on(event, listener);
  }

  /**
   * Emit an event to the event emitter
   * @param event
   * @param args
   */
  emit(event: string, ...args: unknown[]): void {
    Events.getInstance().emit(event, ...args);
  }

  /**
   * Remove all listener from the emitter for the given event or all events
   * @param event
   */
  removeAllListeners(event?: string): void {
    Events.getInstance().removeAllListeners(event);
  }
}
