import Customer from '../../customer/entity/customer';
import Order from '../entity/order';
import OrderItem from '../entity/orderItem';
import { v4 as uuid } from 'uuid';

export default class OrderService {
  static calculateTotal(orders: Order[]) {
    return orders.reduce((acc, order) => acc + order.total, 0);
  }

  static placeOrder(customer: Customer, orderItems: OrderItem[]) {
    const order = new Order(uuid(), customer.id, orderItems);
    const points = order.total / 2;

    customer.addRewardPoints(points);

    return order;
  }
}
