import { EVENTS } from '../constants/events';
import FirstConsoleWhenCustomerIsCreatedHandler from '../event/handler/firstConsoleWhenCustomerIsCreated.handler';
import SecondConsoleWhenCustomerIsCreatedHandler from '../event/handler/secondConsoleWhenCustomerIsCreated.handler';
import Address from '../valueObject/address';
import Customer from './customer';

describe('Customer unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new Customer('', 'Customer Name');
    }).toThrow('Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      new Customer('i1', '');
    }).toThrow('Name is required');
  });

  it('should change customer name', () => {
    const customer = new Customer('i1', 'Customer name');

    const changedName = 'Customer name changed';

    customer.changeName(changedName);

    expect(customer.name).toBe(changedName);
  });

  it('should activate customer', () => {
    const customer = new Customer('i1', 'Customer name');
    const address = new Address('Street 1', 10, `99999-999`, 'City 1');

    customer.changeAddress(address);

    customer.activate();

    expect(customer.isActive).toBe(true);
  });

  it('should deactivate customer', () => {
    const customer = new Customer('i1', 'Customer name');

    expect(customer.isActive).toBe(false);

    const address = new Address('Street 1', 10, `99999-999`, 'City 1');

    customer.changeAddress(address);

    customer.activate();

    expect(customer.isActive).toBe(true);

    customer.deactivate();

    expect(customer.isActive).toBe(false);
  });

  it('should throw an error when active customer and address is not defined', () => {
    expect(() => {
      const customer = new Customer('i1', 'Customer name');

      customer.activate();
    }).toThrow('Adress is mandatory to activate a customer');
  });

  it('should add reward points', () => {
    const customer = new Customer('i1', 'Customer');
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(100);

    expect(customer.rewardPoints).toBe(100);

    customer.addRewardPoints(50);

    expect(customer.rewardPoints).toBe(150);
  });
});
