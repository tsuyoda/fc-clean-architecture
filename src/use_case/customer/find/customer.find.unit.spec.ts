import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/valueObject/address';
import CustomerRepository from '../../../infrastructure/customer/repository/customer.repository';
import CustomerFindUseCase from './customer.find.useCase';

jest.mock('../../../infrastructure/customer/repository/customer.repository');

describe('Customer find use case unit tests', () => {
  it('should find a customer', async () => {
    const address = new Address('Street', 10, '99999-999', 'City');
    const customer = CustomerFactory.createWithAddress('Customer', address);

    const customerRepository = new CustomerRepository();
    const mockFindCustomer = jest.mocked(customerRepository.find);
    mockFindCustomer.mockImplementation(() => Promise.resolve(customer));

    const useCase = new CustomerFindUseCase(customerRepository);

    const input = {
      id: customer.id,
    };

    const result = await useCase.execute(input);

    expect(result).toEqual({
      id: expect.any(String),
      name: 'Customer',
      address: {
        street: 'Street',
        zipcode: '99999-999',
        number: 10,
        city: 'City',
      },
    });
  });

  it('should not find a customer', async () => {
    const customerRepository = new CustomerRepository();
    const mockFindCustomer = jest.mocked(customerRepository.find);
    mockFindCustomer.mockImplementation(() => {
      throw new Error('Customer not found');
    });

    const useCase = new CustomerFindUseCase(customerRepository);

    const input = {
      id: '123',
    };

    expect(useCase.execute(input)).rejects.toThrow('Customer not found');
  });
});
