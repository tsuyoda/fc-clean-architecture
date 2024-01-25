import CustomerChangeAddressEvent from '../event/customerChangeAddress.event';
import CustomerCreatedEvent from '../event/customerCreated.event';

export const EVENTS = {
  CUSTOMER_CREATED: CustomerCreatedEvent.name,
  CUSTOMER_CHANGE_ADDRESS: CustomerChangeAddressEvent.name,
};
