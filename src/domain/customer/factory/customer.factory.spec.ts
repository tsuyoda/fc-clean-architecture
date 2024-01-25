import Address from '../valueObject/address';
import CustomerFactory from './customer.factory';

describe('Customer factory unit tests', () => {
  it('Should create a new customer', () => {
    const customer = CustomerFactory.create('Customer');

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('Customer');
    expect(customer.address).toBeUndefined();
  });

  it('Should create a new customer with address', () => {
    const address = new Address('Street', 100, '99999-999', 'City');
    const customer = CustomerFactory.createWithAddress('Customer', address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('Customer');
    expect(customer.address).toStrictEqual(address);
  });
});
