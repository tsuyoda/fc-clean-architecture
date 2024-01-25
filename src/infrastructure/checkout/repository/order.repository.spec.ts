import { Sequelize } from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';
import CustomerModel from '../../customer/sequelize/model/customer.model';
import ProductModel from '../../product/sequelize/model/product.model';
import OrderItemModel from '../sequelize/model/orderItem.model';
import OrderModel from '../sequelize/model/order.model';
import CustomerRepository from '../../customer/repository/customer.repository';
import Customer from '../../../domain/customer/entity/customer';
import Address from '../../../domain/customer/valueObject/address';
import ProductRepository from '../../product/repository/product.repository';
import Product from '../../../domain/product/entity/product';
import OrderItem from '../../../domain/checkout/entity/orderItem';
import Order from '../../../domain/checkout/entity/order';
import OrderRepository from './order.repository';

describe('Infra Order repository unit tests', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      ProductModel,
      OrderItemModel,
      OrderModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a order', async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer = new Customer(uuid(), 'Customer');
    const address = new Address('Street', 10, '99999-999', 'City');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const product = new Product(uuid(), 'Product', 100);
    await productRepository.create(product);

    const item = new OrderItem(uuid(), 'Item 1', product.id, product.price, 1);

    const order = new Order(uuid(), customer.id, [item]);
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderModel?.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total,
      items: [
        {
          id: item.id,
          name: item.name,
          unit_price: item.unitPrice,
          quantity: item.quantity,
          product_id: item.productId,
          order_id: order.id,
          is_deleted: item.isDeleted,
        },
      ],
    });
  });

  it('should update a order', async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer = new Customer(uuid(), 'Customer');
    const address = new Address('Street', 10, '99999-999', 'City');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const product1 = new Product(uuid(), 'Product 1', 100);
    const product2 = new Product(uuid(), 'Product 2', 200);
    await productRepository.create(product1);
    await productRepository.create(product2);

    const item1 = new OrderItem(
      uuid(),
      'Item 1',
      product1.id,
      product1.price,
      1,
    );
    const item2 = new OrderItem(
      uuid(),
      'Item 2',
      product2.id,
      product2.price,
      1,
    );

    const order = new Order(uuid(), customer.id, [item1]);
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderModel?.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total,
      items: [
        {
          id: item1.id,
          name: item1.name,
          unit_price: item1.unitPrice,
          quantity: item1.quantity,
          product_id: item1.productId,
          order_id: order.id,
          is_deleted: item1.isDeleted,
        },
      ],
    });

    order.addItems([item2]);

    await orderRepository.update(order);

    const newOrderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(newOrderModel?.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total,
      items: [item1, item2].map(item => ({
        id: item.id,
        name: item.name,
        unit_price: item.unitPrice,
        quantity: item.quantity,
        product_id: item.productId,
        order_id: order.id,
        is_deleted: item.isDeleted,
      })),
    });
  });

  it('should find a order', async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer = new Customer(uuid(), 'Customer');
    const address = new Address('Street', 10, '99999-999', 'City');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const product = new Product(uuid(), 'Product', 100);
    await productRepository.create(product);

    const item = new OrderItem(uuid(), 'Item 1', product.id, product.price, 1);

    const order = new Order(uuid(), customer.id, [item]);
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    const searchedOrder = await orderRepository.find(order.id);

    expect(orderModel?.toJSON()).toStrictEqual({
      id: searchedOrder.id,
      customer_id: searchedOrder.customerId,
      total: searchedOrder.total,
      items: searchedOrder.items.map(item => ({
        id: item.id,
        name: item.name,
        unit_price: item.unitPrice,
        quantity: item.quantity,
        product_id: item.productId,
        order_id: searchedOrder.id,
        is_deleted: item.isDeleted,
      })),
    });
  });

  it('should find all orders', async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer1 = new Customer(uuid(), 'Customer 1');
    const address1 = new Address('Street 1', 10, '19999-999', 'City');
    customer1.changeAddress(address1);
    await customerRepository.create(customer1);

    const customer2 = new Customer(uuid(), 'Customer 2');
    const address2 = new Address('Street 2', 10, '29999-999', 'City');
    customer2.changeAddress(address2);
    await customerRepository.create(customer2);

    const product1 = new Product(uuid(), 'Product 1', 100);
    await productRepository.create(product1);

    const product2 = new Product(uuid(), 'Product 2', 200);
    await productRepository.create(product2);

    const item1 = new OrderItem(
      uuid(),
      'Item 1',
      product1.id,
      product1.price,
      2,
    );
    const item2 = new OrderItem(
      uuid(),
      'Item 2',
      product2.id,
      product2.price,
      1,
    );

    const order1 = new Order(uuid(), customer1.id, [item1]);
    await orderRepository.create(order1);
    const order2 = new Order(uuid(), customer2.id, [item2]);
    await orderRepository.create(order2);

    const ordersModel = await OrderModel.findAll({ include: ['items'] });

    const searchedOrders = await orderRepository.findAll();

    expect(ordersModel.map(order => order.toJSON())).toStrictEqual(
      searchedOrders.map(searchedOrder => ({
        id: searchedOrder.id,
        customer_id: searchedOrder.customerId,
        total: searchedOrder.total,
        items: searchedOrder.items.map(item => ({
          id: item.id,
          name: item.name,
          unit_price: item.unitPrice,
          quantity: item.quantity,
          product_id: item.productId,
          order_id: searchedOrder.id,
          is_deleted: item.isDeleted,
        })),
      })),
    );
  });

  it('should add new items to a order', async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer = new Customer(uuid(), 'Customer');
    const address = new Address('Street', 10, '99999-999', 'City');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const product1 = new Product(uuid(), 'Product 1', 100);
    const product2 = new Product(uuid(), 'Product 2', 200);
    await productRepository.create(product1);
    await productRepository.create(product2);

    const item1 = new OrderItem(
      uuid(),
      'Item 1',
      product1.id,
      product1.price,
      1,
    );
    const item2 = new OrderItem(
      uuid(),
      'Item 2',
      product2.id,
      product2.price,
      1,
    );

    const order = new Order(uuid(), customer.id, [item1]);
    await orderRepository.create(order);

    const searchedOrder1 = await orderRepository.find(order.id);

    expect(order.items).toStrictEqual(searchedOrder1.items);

    order.addItems([item2]);
    await orderRepository.update(order);

    const searchedOrder2 = await orderRepository.find(order.id);

    expect(order.items).toStrictEqual(searchedOrder2.items);
  });

  it('should remove items from order', async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer = new Customer(uuid(), 'Customer');
    const address = new Address('Street', 10, '99999-999', 'City');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const product1 = new Product(uuid(), 'Product 1', 100);
    const product2 = new Product(uuid(), 'Product 2', 200);
    const product3 = new Product(uuid(), 'Product 3', 300);
    await productRepository.create(product1);
    await productRepository.create(product2);
    await productRepository.create(product3);

    const item1 = new OrderItem(
      uuid(),
      'Item 1',
      product1.id,
      product1.price,
      1,
    );
    const item2 = new OrderItem(
      uuid(),
      'Item 2',
      product2.id,
      product2.price,
      1,
    );
    const item3 = new OrderItem(
      uuid(),
      'Item 3',
      product3.id,
      product3.price,
      1,
    );

    const order = new Order(uuid(), customer.id, [item1, item2, item3]);
    await orderRepository.create(order);

    const searchedOrder1 = await orderRepository.find(order.id);

    expect(order.items).toStrictEqual(searchedOrder1.items);

    order.removeItems([item2, item3].map(item => item.id));
    await orderRepository.update(order);

    const searchedOrder2 = await orderRepository.find(order.id);

    expect(order.items).toStrictEqual(searchedOrder2.items);
  });

  it('shoud throw a error when order not found', () => {
    const orderRepository = new OrderRepository();

    expect(async () => {
      await orderRepository.find(uuid());
    }).rejects.toThrow('Order not found');
  });
});
