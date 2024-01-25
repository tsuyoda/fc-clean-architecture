import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/valueObject/address';
import CustomerRepository from '../../../infrastructure/customer/repository/customer.repository';
import CustomerListUseCase from './customer.list.useCase';

jest.mock('../../../infrastructure/customer/repository/customer.repository');

describe('Customer list use case unit tests', () => {
  it('Should list customers', async () => {
    const address1 = new Address('Street 1', 10, '19999-999', 'City 1');
    const address2 = new Address('Street 2', 20, '29999-999', 'City 2');
    const customer1 = CustomerFactory.createWithAddress('Customer 1', address1);
    const customer2 = CustomerFactory.createWithAddress('Customer 2', address2);

    const customers = [customer1, customer2];

    const customerRepository = new CustomerRepository();
    const mockFindAllCustomers = jest.mocked(customerRepository.findAll);
    mockFindAllCustomers.mockImplementation(() => Promise.resolve(customers));

    const useCase = new CustomerListUseCase(customerRepository);

    const result = await useCase.execute({});

    expect(result.customers.length).toBe(2);

    expect(result.customers).toStrictEqual(
      customers.map(customer => ({
        id: expect.any(String),
        name: customer.name,
        address: {
          street: customer.address?.street,
          number: customer.address?.number,
          zipcode: customer.address?.zipcode,
          city: customer.address?.city,
        },
      })),
    );
  });
});
