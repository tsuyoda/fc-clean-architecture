import IEventHandler from '../../../@shared/event/handler/eventHandler.interface';
import CustomerChangeAddressEvent from '../customerChangeAddress.event';

export default class ConsoleWhenCustomerAddressIsChangedHandler
  implements IEventHandler<CustomerChangeAddressEvent>
{
  handle(event: CustomerChangeAddressEvent): void {
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address?.toString()}`,
    );
  }
}
