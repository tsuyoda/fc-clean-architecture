import Order from '../../../domain/checkout/entity/order';
import OrderItem from '../../../domain/checkout/entity/orderItem';
import IOrderRepository from '../../../domain/checkout/repository/order.repository.interface';
import OrderModel from '../sequelize/model/order.model';
import OrderItemModel from '../sequelize/model/orderItem.model';

export default class OrderRepository implements IOrderRepository {
  async create(entity: Order) {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total,
        items: entity.items.map(item => ({
          id: item.id,
          name: item.name,
          unit_price: item.unitPrice,
          quantity: item.quantity,
          product_id: item.productId,
          order_id: entity.id,
          is_deleted: item.isDeleted,
        })),
      },
      { include: [{ model: OrderItemModel }] },
    );
  }

  async update(entity: Order) {
    const currentOrder = await this.find(entity.id);

    const addedItems = entity.items.filter(
      item =>
        !currentOrder.items.some(currentItem => currentItem.id === item.id),
    );

    const deletedItems = currentOrder.items.filter(
      currentItem => !entity.items.some(item => currentItem.id === item.id),
    );

    if (addedItems.length > 0) {
      await this.addItems(currentOrder.id, addedItems);
    }

    if (deletedItems.length > 0) {
      await this.removeItems(deletedItems.map(item => item.id));
    }

    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total,
      },
      { where: { id: currentOrder.id } },
    );
  }

  async find(id: string) {
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: [
        { model: OrderItemModel, as: 'items', where: { is_deleted: false } },
      ],
      rejectOnEmpty: true,
    }).catch(() => {
      throw new Error('Order not found');
    });

    const items = orderModel.items.map(
      item =>
        new OrderItem(
          item.id,
          item.name,
          item.product_id,
          item.unit_price,
          item.quantity,
        ),
    );

    return new Order(orderModel.id, orderModel.customer_id, items);
  }

  async findAll() {
    const ordersModel = await OrderModel.findAll({
      include: [
        { model: OrderItemModel, as: 'items', where: { is_deleted: false } },
      ],
    });

    return ordersModel.map(orderModel => {
      const items = orderModel.items.map(
        item =>
          new OrderItem(
            item.id,
            item.name,
            item.product_id,
            item.unit_price,
            item.quantity,
          ),
      );

      return new Order(orderModel.id, orderModel.customer_id, items);
    });
  }

  async addItems(orderId: string, items: OrderItem[]) {
    await OrderItemModel.bulkCreate(
      items.map(item => ({
        id: item.id,
        name: item.name,
        product_id: item.productId,
        unit_price: item.unitPrice,
        quantity: item.quantity,
        order_id: orderId,
        is_deleted: item.isDeleted,
      })),
    );
  }

  async removeItems(itemIds: string[]) {
    await OrderItemModel.update(
      { is_deleted: true },
      { where: { id: itemIds } },
    );
  }
}
