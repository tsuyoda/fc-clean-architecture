import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import ProductModel from '../../../product/sequelize/model/product.model';
import OrderModel from './order.model';

@Table({
  tableName: 'order_items',
  timestamps: false,
})
export default class OrderItemModel extends Model {
  @Column({ primaryKey: true })
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare unit_price: number;

  @Column({ allowNull: false })
  declare quantity: number;

  @ForeignKey(() => ProductModel)
  @Column({ allowNull: false })
  declare product_id: string;

  @BelongsTo(() => ProductModel)
  declare product: ProductModel;

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false })
  declare order_id: string;

  @BelongsTo(() => OrderModel)
  declare order: OrderModel;

  @Column({ allowNull: false })
  declare is_deleted: boolean;
}
