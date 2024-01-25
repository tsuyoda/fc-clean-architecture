import ICustomerRepository from '../../../domain/customer/repository/customer.repository.interface';
import {
  IInputListCustomerDTO,
  IOutputListCustomerDTO,
} from './customer.list.dto';

export default class CustomerListUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(input: IInputListCustomerDTO): Promise<IOutputListCustomerDTO> {
    const customers = await this.customerRepository.findAll();

    return {
      customers: customers.map(customer => {
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
      }),
    };
  }
}
