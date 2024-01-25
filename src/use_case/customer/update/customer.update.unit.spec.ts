import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/valueObject/address';
import CustomerRepository from '../../../infrastructure/customer/repository/customer.repository';
import CustomerUpdateUseCase from './customer.update.useCase';

jest.mock('../../../infrastructure/customer/repository/customer.repository');

describe('Customer update use case unit tests', () => {
  const input = {
    id: 'i1',
    name: 'New Customer',
    address: {
      street: 'New Street',
      number: 20,
      zipcode: '99999-999',
      city: 'New City',
    },
  };

  it('Should update a customer', async () => {
    const address = new Address('Street', 10, '00000-000', 'City');
    const customer = CustomerFactory.createWithAddress('Customer', address);

    const customerRepository = new CustomerRepository();
    const mockFindCustomer = jest.mocked(customerRepository.find);
    mockFindCustomer.mockImplementation(() => Promise.resolve(customer));

    const useCase = new CustomerUpdateUseCase(customerRepository);

    const result = await useCase.execute(input);

    expect(result).toStrictEqual(result);
  });

  it('should not find a customer', async () => {
    const customerRepository = new CustomerRepository();
    const mockFindCustomer = jest.mocked(customerRepository.find);
    mockFindCustomer.mockImplementation(() => {
      throw new Error('Customer not found');
    });

    const useCase = new CustomerUpdateUseCase(customerRepository);

    expect(useCase.execute(input)).rejects.toThrow('Customer not found');
  });
});
