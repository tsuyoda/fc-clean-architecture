import { Sequelize } from 'sequelize-typescript';
import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/valueObject/address';
import CustomerRepository from '../../../infrastructure/customer/repository/customer.repository';
import CustomerUpdateUseCase from './customer.update.useCase';
import CustomerModel from '../../../infrastructure/customer/sequelize/model/customer.model';

describe('Customer update use case unit tests', () => {
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

    await customerRepository.create(customer);

    const useCase = new CustomerUpdateUseCase(customerRepository);

    input.id = customer.id;

    const result = await useCase.execute(input);

    expect(result).toStrictEqual(result);
  });

  it('should not find a customer', async () => {
    const customerRepository = new CustomerRepository();

    const useCase = new CustomerUpdateUseCase(customerRepository);

    expect(useCase.execute(input)).rejects.toThrow('Customer not found');
  });
});
