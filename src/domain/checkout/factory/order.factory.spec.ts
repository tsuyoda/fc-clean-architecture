import OrderFactory from './order.factory';
import { IOrderProps } from './order.factory.interface';
import { v4 as uuid } from 'uuid';

describe('Order Factory unit tests', () => {
  it('Should create a new order', () => {
    const orderProps: IOrderProps = {
      customerId: uuid(),
      items: [
        {
          name: 'Item 1',
          productId: uuid(),
          unitPrice: 100,
          quantity: 10,
        },
      ],
    };

    const order = OrderFactory.create(orderProps);

    expect(order.customerId).toBe(orderProps.customerId);
    expect(order.items.length).toBe(1);
  });
});
