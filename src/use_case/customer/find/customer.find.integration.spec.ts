import { Sequelize } from 'sequelize-typescript';
import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/valueObject/address';
import CustomerRepository from '../../../infrastructure/customer/repository/customer.repository';
import CustomerFindUseCase from './customer.find.useCase';
import CustomerModel from '../../../infrastructure/customer/sequelize/model/customer.model';

describe('Customer find use case unit tests', () => {
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

  it('should find a customer', async () => {
    const address = new Address('Street', 10, '99999-999', 'City');
    const customer = CustomerFactory.createWithAddress('Customer', address);

    const customerRepository = new CustomerRepository();

    await customerRepository.create(customer);

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

    const useCase = new CustomerFindUseCase(customerRepository);

    const input = {
      id: '123',
    };

    expect(useCase.execute(input)).rejects.toThrow('Customer not found');
  });
});
