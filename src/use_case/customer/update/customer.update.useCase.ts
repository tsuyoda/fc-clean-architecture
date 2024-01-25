import ICustomerRepository from '../../../domain/customer/repository/customer.repository.interface';
import Address from '../../../domain/customer/valueObject/address';
import {
  IInputUpdateCustomerDTO,
  IOutputUpdateCustomerDTO,
} from './customer.update.dto';

export default class CustomerUpdateUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(
    input: IInputUpdateCustomerDTO,
  ): Promise<IOutputUpdateCustomerDTO> {
    const customer = await this.customerRepository.find(input.id);
    customer.changeName(input.name);

    const inputAddress =
      input.address &&
      new Address(
        input.address.street,
        input.address.number,
        input.address.zipcode,
        input.address.city,
      );

    if (inputAddress) {
      customer.changeAddress(inputAddress);
    }

    await this.customerRepository.update(customer);

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
