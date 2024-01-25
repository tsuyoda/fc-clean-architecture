import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import ICustomerRepository from '../../../domain/customer/repository/customer.repository.interface';
import Address from '../../../domain/customer/valueObject/address';
import {
  IInputCreateCustomerDTO,
  IOutputCreateCustomerDTO,
} from './customer.create.dto';

export default class CustomerCreateUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(
    input: IInputCreateCustomerDTO,
  ): Promise<IOutputCreateCustomerDTO> {
    const inputAddress =
      input.address &&
      new Address(
        input.address.street,
        input.address.number,
        input.address.zipcode,
        input.address.city,
      );

    const customer = inputAddress
      ? CustomerFactory.createWithAddress(input.name, inputAddress)
      : CustomerFactory.create(input.name);

    await this.customerRepository.create(customer);

    const address = customer.address && {
      street: customer.address.street,
      number: customer.address.number,
      zipcode: customer.address.zipcode,
      city: customer.address.city,
    };

    return {
      id: customer.id,
      name: customer.name,
      address,
    };
  }
}
