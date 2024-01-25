import Order from '../entity/order';
import OrderItem from '../entity/orderItem';
import IRepository from '../../@shared/repository/repository.interface';

export default interface IOrderRepository extends IRepository<Order> {
  addItems(orderId: string, items: OrderItem[]): Promise<void>;
  removeItems(itemIds: string[]): Promise<void>;
}
