import Customer from '../entity/customer';
import { EVENTS } from '../constants/events';
import FirstConsoleWhenCustomerIsCreatedHandler from '../event/handler/firstConsoleWhenCustomerIsCreated.handler';
import SecondConsoleWhenCustomerIsCreatedHandler from '../event/handler/secondConsoleWhenCustomerIsCreated.handler';
import ConsoleWhenCustomerAddressIsChangedHandler from '../event/handler/consoleWhenCustomerAddressIsChanged.handler';
import CustomerCreatedEvent from '../event/customerCreated.event';
import Address from '../valueObject/address';
import CustomerChangeAddressEvent from '../event/customerChangeAddress.event';
import EventDispatcher from '../../@shared/event/eventDispatcher';
import CustomerRepository from '../../../infrastructure/customer/repository/customer.repository';
import CustomerFactory from '../factory/customer.factory';

export default class CustomerService {
  constructor(
    private _customerRepository: CustomerRepository,
    private _eventDispatcher: EventDispatcher,
  ) {
    this._eventDispatcher.register(
      EVENTS.CUSTOMER_CREATED,
      new FirstConsoleWhenCustomerIsCreatedHandler(),
    );

    this._eventDispatcher.register(
      EVENTS.CUSTOMER_CREATED,
      new SecondConsoleWhenCustomerIsCreatedHandler(),
    );

    this._eventDispatcher.register(
      EVENTS.CUSTOMER_CHANGE_ADDRESS,
      new ConsoleWhenCustomerAddressIsChangedHandler(),
    );
  }

  async create(name: string, address: Address): Promise<Customer> {
    const customer = CustomerFactory.createWithAddress(name, address);

    await this._customerRepository.create(customer);

    const customerCreatedEvent = new CustomerCreatedEvent(customer);
    this._eventDispatcher.notify(customerCreatedEvent);

    return customer;
  }

  async changeAddress(customerId: string, newAddress: Address): Promise<void> {
    const customer = await this._customerRepository.find(customerId);

    customer.changeAddress(newAddress);

    await this._customerRepository.update(customer);

    const changeAddressEvent = new CustomerChangeAddressEvent(customer);
    this._eventDispatcher.notify(changeAddressEvent);
  }
}
