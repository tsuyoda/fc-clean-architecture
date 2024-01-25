import Customer from '../../customer/entity/customer';
import Order from '../entity/order';
import OrderItem from '../entity/orderItem';
import OrderService from './order.service';

describe('Order service unit tests', () => {
  it('Should get total of all orders', () => {
    const item1 = new OrderItem('i1', 'Item 1', 'p1', 100, 1);
    const item2 = new OrderItem('i2', 'Item 2', 'p2', 200, 2);

    const order1 = new Order('i1', 'c1', [item1]);
    const order2 = new Order('i2', 'c1', [item2]);

    const total = OrderService.calculateTotal([order1, order2]);

    expect(total).toBe(500);
  });

  it('should place an order', () => {
    const customer = new Customer('i1', 'Customer 1');
    const item = new OrderItem('i1', 'Item 1', 'p1', 100, 1);

    const order = OrderService.placeOrder(customer, [item]);

    expect(customer.rewardPoints).toBe(50);
    expect(order.total).toBe(100);
  });
});
