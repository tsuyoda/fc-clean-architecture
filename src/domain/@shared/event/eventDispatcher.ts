import IEvent from './event.interface';
import IEventDispatcher from './eventDispatcher.interface';
import IEventHandler from './handler/eventHandler.interface';

export default class EventDispatcher implements IEventDispatcher {
  private _eventHandlers: { [eventName: string]: IEventHandler[] } = {};

  get eventHandlers() {
    return this._eventHandlers;
  }

  notify(event: IEvent): void {
    if (!this._eventHandlers[event.constructor.name]) {
      return;
    }

    this._eventHandlers[event.constructor.name].forEach(handler => {
      handler.handle(event);
    });
  }

  register(eventName: string, eventHandler: IEventHandler<IEvent>): void {
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }

    this._eventHandlers[eventName].push(eventHandler);
  }

  unregister(eventName: string, eventHandler: IEventHandler<IEvent>): void {
    if (!this._eventHandlers[eventName]) {
      return;
    }

    const index = this._eventHandlers[eventName].indexOf(eventHandler);

    if (index !== -1) {
      this._eventHandlers[eventName].splice(index, 1);
    }
  }

  unregisterAll(): void {
    this._eventHandlers = {};
  }
}
