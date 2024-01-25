import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../../../infrastructure/customer/sequelize/model/customer.model';
import CustomerService from './customer.service';
import CustomerRepository from '../../../infrastructure/customer/repository/customer.repository';
import EventDispatcher from '../../@shared/event/eventDispatcher';
import { EVENTS } from '../constants/events';
import Address from '../valueObject/address';

describe('Customer service unit tests', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('Should create a new customer', async () => {
    const customerRepository = new CustomerRepository();
    const eventDispatcher = new EventDispatcher();

    const customerService = new CustomerService(
      customerRepository,
      eventDispatcher,
    );

    const [
      firstConsoleWhenCustomerIsCreatedHandler,
      secondConsoleWhenCustomerIsCreatedHandler,
    ] = eventDispatcher.eventHandlers[EVENTS.CUSTOMER_CREATED];

    const spyFirstConsoleWhenCustomerIsCreatedHandler = jest.spyOn(
      firstConsoleWhenCustomerIsCreatedHandler,
      'handle',
    );

    const spySecondConsoleWhenCustomerIsCreatedHandler = jest.spyOn(
      secondConsoleWhenCustomerIsCreatedHandler,
      'handle',
    );

    const address = new Address('Street 1', 100, '99999-999', 'City');
    const customer = await customerService.create('Customer', address);

    const searchedCustomer = await customerRepository.find(customer.id);

    expect(searchedCustomer).toStrictEqual(customer);
    expect(spyFirstConsoleWhenCustomerIsCreatedHandler).toHaveBeenCalled();
    expect(spySecondConsoleWhenCustomerIsCreatedHandler).toHaveBeenCalled();
  });

  it('Should change customer address', async () => {
    const customerRepository = new CustomerRepository();
    const eventDispatcher = new EventDispatcher();

    const customerService = new CustomerService(
      customerRepository,
      eventDispatcher,
    );

    const [consoleWhenCustomerAddressIsChangedHandler] =
      eventDispatcher.eventHandlers[EVENTS.CUSTOMER_CHANGE_ADDRESS];

    const spyConsoleWhenCustomerAddressIsChangedHandler = jest.spyOn(
      consoleWhenCustomerAddressIsChangedHandler,
      'handle',
    );

    const address = new Address('Street 1', 100, '19999-999', 'City');
    const customer = await customerService.create('Customer', address);

    const newAddress = new Address('Street 2', 100, '29999-999', 'City');

    await customerService.changeAddress(customer.id, newAddress);

    const searchedCustomer = await customerRepository.find(customer.id);

    expect(searchedCustomer.address).toStrictEqual(newAddress);
    expect(spyConsoleWhenCustomerAddressIsChangedHandler).toHaveBeenCalled();
  });
});
