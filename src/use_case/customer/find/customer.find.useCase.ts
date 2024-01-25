import ICustomerRepository from '../../../domain/customer/repository/customer.repository.interface';
import {
  IInputFindCustomerDTO,
  IOutputFindCustomerDTO,
} from './customer.find.dto';

export default class CustomerFindUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(input: IInputFindCustomerDTO): Promise<IOutputFindCustomerDTO> {
    const customer = await this.customerRepository.find(input.id);

    const address = customer.address && {
      street: customer.address?.street,
      number: customer.address?.number,
      zipcode: customer.address?.zipcode,
      city: customer.address?.city,
    };

    return {
      id: customer.id,
      name: customer.name,
      address,
    };
  }
}
