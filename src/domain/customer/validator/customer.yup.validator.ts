import Customer from '../entity/customer';
import { IValidator } from './validator.interface';
import * as yup from 'yup';

export default class CustomerYupValidator implements IValidator<Customer> {
  validate(entity: Customer): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('Id is required'),
          name: yup.string().required('Name is required'),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
          },
          { abortEarly: false },
        );
    } catch (err) {
      const e = err as yup.ValidationError;

      e.errors.forEach(error => {
        entity.notification.addNotification({
          context: entity.constructor.name,
          message: error,
        });
      });
    }
  }
}
