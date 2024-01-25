import Address from '../../../domain/customer/valueObject/address';
import Customer from '../../../domain/customer/entity/customer';
import ICustomerRepository from '../../../domain/customer/repository/customer.repository.interface';
import CustomerModel from '../sequelize/model/customer.model';

export default class CustomerRepository implements ICustomerRepository {
  async create(entity: Customer) {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address?.street,
      number: entity.address?.number,
      zipcode: entity.address?.zipcode,
      city: entity.address?.city,
      active: entity.isActive,
      rewardPoints: entity.rewardPoints,
    });
  }

  async update(entity: Customer) {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address?.street,
        number: entity.address?.number,
        zipcode: entity.address?.zipcode,
        city: entity.address?.city,
        active: entity.isActive,
        rewardPoints: entity.rewardPoints,
      },
      { where: { id: entity.id } },
    );
  }

  async find(id: string) {
    const customerModel = await CustomerModel.findOne({
      where: { id },
      rejectOnEmpty: true,
    }).catch(() => {
      throw new Error('Customer not found');
    });

    const customer = new Customer(customerModel.id, customerModel.name);
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zipcode,
      customerModel.city,
    );

    customer.changeAddress(address);
    customer.addRewardPoints(customerModel.rewardPoints);

    if (customerModel.active) {
      customer.activate();
    }

    return customer;
  }

  async findAll() {
    const customers = await CustomerModel.findAll();

    return customers.map(customerModel => {
      const customer = new Customer(customerModel.id, customerModel.name);
      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zipcode,
        customerModel.city,
      );

      customer.changeAddress(address);
      customer.addRewardPoints(customerModel.rewardPoints);

      if (customerModel.active) {
        customer.activate();
      }

      return customer;
    });
  }
}
