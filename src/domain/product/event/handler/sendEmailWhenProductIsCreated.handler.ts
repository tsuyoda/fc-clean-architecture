import IEventHandler from '../../../@shared/event/handler/eventHandler.interface';
import ProducerCreatedEvent from '../productCreated.event';

export default class SendEmailWhenProductIsCreatedHandler
  implements IEventHandler<ProducerCreatedEvent>
{
  handle(event: ProducerCreatedEvent): void {
    console.log('Sending email to ...'); // TODO: Implement email sender
  }
}
