import Customer from '../entity/customer';
import CustomerYupValidator from '../validator/customer.yup.validator';
import { IValidator } from '../validator/validator.interface';

export default class CustomerValidatorFactory {
  static create(): IValidator<Customer> {
    return new CustomerYupValidator();
  }
}
