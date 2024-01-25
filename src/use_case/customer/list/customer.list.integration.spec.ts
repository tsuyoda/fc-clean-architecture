import { Sequelize } from 'sequelize-typescript';
import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/valueObject/address';
import CustomerRepository from '../../../infrastructure/customer/repository/customer.repository';
import CustomerListUseCase from './customer.list.useCase';
import CustomerModel from '../../../infrastructure/customer/sequelize/model/customer.model';

describe('Customer list use case integration tests', () => {
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
  it('Should list customers', async () => {
    const address1 = new Address('Street 1', 10, '19999-999', 'City 1');
    const address2 = new Address('Street 2', 20, '29999-999', 'City 2');
    const customer1 = CustomerFactory.createWithAddress('Customer 1', address1);
    const customer2 = CustomerFactory.createWithAddress('Customer 2', address2);

    const customers = [customer1, customer2];

    const customerRepository = new CustomerRepository();

    await Promise.all(
      customers.map(async customer => {
        await customerRepository.create(customer);
      }),
    );

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
