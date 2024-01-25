import IEventHandler from '../../../@shared/event/handler/eventHandler.interface';
import CustomerCreatedEvent from '../customerCreated.event';

export default class FirstConsoleWhenCustomerIsCreatedHandler
  implements IEventHandler<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log('Esse é o primeiro console.log do evento: CustomerCreated');
  }
}
