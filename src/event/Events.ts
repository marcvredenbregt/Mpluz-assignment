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

  on(event: string, listener: (...args: unknown[]) => void): void {
    Events.getInstance().on(event, listener);
  }

  emit(event: string, ...args: unknown[]): void {
    Events.getInstance().emit(event, ...args);
  }

  removeAllListeners(event?: string): void {
    Events.getInstance().removeAllListeners(event);
  }
}
