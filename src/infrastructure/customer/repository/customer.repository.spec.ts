import { Sequelize } from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';
import CustomerModel from '../sequelize/model/customer.model';
import CustomerRepository from './customer.repository';
import Customer from '../../../domain/customer/entity/customer';
import Address from '../../../domain/customer/valueObject/address';

describe('Infra Customer repository unit tests', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a customer', async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer(uuid(), 'Customer');
    const address = new Address('Street', 10, '99999-999', 'City');

    customer.changeAddress(address);

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({
      where: { id: customer.id },
    });

    expect(customerModel?.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      street: customer.address?.street,
      number: customer.address?.number,
      zipcode: customer.address?.zipcode,
      city: customer.address?.city,
      active: customer.isActive,
      rewardPoints: customer.rewardPoints,
    });
  });

  it('should update a customer', async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer(uuid(), 'Customer');
    const address = new Address('Street', 10, '99999-999', 'City');

    customer.changeAddress(address);
    customer.activate();

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({
      where: { id: customer.id },
    });

    expect(customerModel?.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      street: customer.address?.street,
      number: customer.address?.number,
      zipcode: customer.address?.zipcode,
      city: customer.address?.city,
      active: customer.isActive,
      rewardPoints: customer.rewardPoints,
    });

    customer.changeName('New Customer');

    const newAddress = new Address('New Street', 11, '19999-999', 'New City');
    customer.changeAddress(newAddress);
    customer.deactivate();

    await customerRepository.update(customer);

    const newCustomerModel = await CustomerModel.findOne({
      where: { id: customer.id },
    });

    expect(newCustomerModel?.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      street: customer.address?.street,
      number: customer.address?.number,
      zipcode: customer.address?.zipcode,
      city: customer.address?.city,
      active: customer.isActive,
      rewardPoints: customer.rewardPoints,
    });
  });

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer(uuid(), 'Customer');
    const address = new Address('Street', 10, '99999-999', 'City');

    customer.changeAddress(address);
    customer.activate();

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({
      where: { id: customer.id },
    });

    const searchedCustomer = await customerRepository.find(customer.id);

    expect(customerModel?.toJSON()).toStrictEqual({
      id: searchedCustomer.id,
      name: searchedCustomer.name,
      street: searchedCustomer.address?.street,
      number: searchedCustomer.address?.number,
      zipcode: searchedCustomer.address?.zipcode,
      city: searchedCustomer.address?.city,
      active: searchedCustomer.isActive,
      rewardPoints: searchedCustomer.rewardPoints,
    });
  });

  it('should find all customers', async () => {
    const customerRepository = new CustomerRepository();

    const customer1 = new Customer(uuid(), 'Customer 1');
    const address1 = new Address('Street 1', 10, '19999-999', 'City 1');

    customer1.changeAddress(address1);
    customer1.activate();

    const customer2 = new Customer(uuid(), 'Customer 2');
    const address2 = new Address('Street 2', 10, '29999-999', 'City 2');

    customer2.changeAddress(address2);

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const customersModel = await CustomerModel.findAll();

    const searchedCustomers = await customerRepository.findAll();

    expect(customersModel.map(customer => customer.toJSON())).toStrictEqual(
      searchedCustomers.map(customer => ({
        id: customer.id,
        name: customer.name,
        street: customer.address?.street,
        number: customer.address?.number,
        zipcode: customer.address?.zipcode,
        city: customer.address?.city,
        active: customer.isActive,
        rewardPoints: customer.rewardPoints,
      })),
    );
  });

  it('should throw a error when find a customer that does not exists', async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => {
      await customerRepository.find(uuid());
    }).rejects.toThrow('Customer not found');
  });
});
