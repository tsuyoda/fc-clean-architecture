import { Sequelize } from 'sequelize-typescript';
import CustomerRepository from '../../../infrastructure/customer/repository/customer.repository';
import CustomerCreateUseCase from './customer.create.useCase';
import CustomerModel from '../../../infrastructure/customer/sequelize/model/customer.model';

describe('Customer create use case integration tests', () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

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
