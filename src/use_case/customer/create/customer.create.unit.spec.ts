import CustomerRepository from '../../../infrastructure/customer/repository/customer.repository';
import CustomerCreateUseCase from './customer.create.useCase';
jest.mock('../../../infrastructure/customer/repository/customer.repository');

describe('Customer create use case unit tests', () => {
  const input = {
    name: 'Customer',
    address: {
      street: 'Street',
      number: 123,
      zipcode: '99999-999',
      city: 'City',
    },
  };

  it('Should create a customer', async () => {
    const customerRepository = new CustomerRepository();
    const useCase = new CustomerCreateUseCase(customerRepository);

    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zipcode: input.address.zipcode,
        city: input.address.city,
      },
    });
  });

  it('Should throw an error when name is missing', async () => {
    const customerRepository = new CustomerRepository();
    const useCase = new CustomerCreateUseCase(customerRepository);

    input.name = '';

    expect(useCase.execute(input)).rejects.toThrow('Name is required');
  });

  it('Should throw an error when address street is missing', async () => {
    const customerRepository = new CustomerRepository();
    const useCase = new CustomerCreateUseCase(customerRepository);

    input.address.street = '';

    expect(useCase.execute(input)).rejects.toThrow('Street is required');
  });
});
