import { Table, Column, Model } from 'sequelize-typescript';

@Table({
  tableName: 'products',
  timestamps: false,
})
export default class ProductModel extends Model {
  @Column({ primaryKey: true })
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare price: number;
}
