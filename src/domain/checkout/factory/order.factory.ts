import Order from '../entity/order';
import OrderItem from '../entity/orderItem';
import { IOrderProps } from './order.factory.interface';
import { v4 as uuid } from 'uuid';

export default class OrderFactory {
  static create(orderProps: IOrderProps): Order {
    const items = orderProps.items.map(
      item =>
        new OrderItem(
          uuid(),
          item.name,
          item.productId,
          item.unitPrice,
          item.quantity,
        ),
    );

    return new Order(uuid(), orderProps.customerId, items);
  }
}
