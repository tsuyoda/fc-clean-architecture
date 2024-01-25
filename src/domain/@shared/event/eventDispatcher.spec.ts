import SendEmailWhenProductIsCreatedHandler from '../../product/event/handler/sendEmailWhenProductIsCreated.handler';
import ProducerCreatedEvent from '../../product/event/productCreated.event';
import EventDispatcher from './eventDispatcher';

describe('Event Dispatcher unit tests', () => {
  it('Should register an event handler', () => {
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const eventDispatcher = new EventDispatcher();

    const eventName = 'ProducerCreatedEvent';

    eventDispatcher.register(eventName, eventHandler);

    expect(eventDispatcher.eventHandlers[eventName]).toBeDefined();
    expect(eventDispatcher.eventHandlers[eventName].length).toBe(1);

    const [searchedEventHandler] = eventDispatcher.eventHandlers[eventName];

    expect(searchedEventHandler).toBe(eventHandler);
  });

  it('Should unregister an event handler', () => {
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const eventDispatcher = new EventDispatcher();

    const eventName = 'ProducerCreatedEvent';

    eventDispatcher.register(eventName, eventHandler);

    expect(eventDispatcher.eventHandlers[eventName]).toBeDefined();
    expect(eventDispatcher.eventHandlers[eventName].length).toBe(1);

    const [searchedEventHandler] = eventDispatcher.eventHandlers[eventName];

    expect(searchedEventHandler).toBe(eventHandler);

    eventDispatcher.unregister(eventName, eventHandler);

    expect(eventDispatcher.eventHandlers[eventName].length).toBe(0);
  });

  it('Should unregister all event handlers', () => {
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const eventDispatcher = new EventDispatcher();

    const eventName = 'ProducerCreatedEvent';

    eventDispatcher.register(eventName, eventHandler);

    expect(eventDispatcher.eventHandlers[eventName]).toBeDefined();
    expect(eventDispatcher.eventHandlers[eventName].length).toBe(1);

    const [searchedEventHandler] = eventDispatcher.eventHandlers[eventName];

    expect(searchedEventHandler).toBe(eventHandler);

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.eventHandlers[eventName]).toBeUndefined();
  });

  it('Should notify an event handler', () => {
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const eventDispatcher = new EventDispatcher();

    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    const productCreatedEvent = new ProducerCreatedEvent({
      id: 'i1',
      name: 'Product 1',
      price: 100,
    });

    const eventName = productCreatedEvent.constructor.name;

    eventDispatcher.register(eventName, eventHandler);

    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
