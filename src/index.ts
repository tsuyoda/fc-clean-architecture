import { Sequelize } from 'sequelize-typescript';

import Address from './domain/customer/valueObject/address';
import EventDispatcher from './domain/@shared/event/eventDispatcher';
import CustomerService from './domain/customer/service/customer.service';
import CustomerRepository from './infrastructure/customer/repository/customer.repository';
import CustomerModel from './infrastructure/customer/sequelize/model/customer.model';

async function main() {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
    sync: { force: true },
  });

  sequelize.addModels([CustomerModel]);
  await sequelize.sync();

  const customerService = new CustomerService(
    new CustomerRepository(),
    new EventDispatcher(),
  );

  const address = new Address('Street 1', 100, '19999-999', 'City');
  const customer = await customerService.create('Customer 1', address);

  const newAddress = new Address('Street 2', 100, '29999-999', 'City');

  await customerService.changeAddress(customer.id, newAddress);
}

main();
