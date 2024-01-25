import IEvent from './event.interface';
import IEventHandler from './handler/eventHandler.interface';

export default interface IEventDispatcher {
  notify(event: IEvent): void;
  register(eventName: string, eventHandler: IEventHandler): void;
  unregister(eventName: string, eventHandler: IEventHandler): void;
  unregisterAll(): void;
}
