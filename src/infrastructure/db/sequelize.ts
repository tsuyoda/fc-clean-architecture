import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import CustomerModel from '../customer/sequelize/model/customer.model';
import ProductModel from '../product/sequelize/model/product.model';
import OrderItemModel from '../checkout/sequelize/model/orderItem.model';
import OrderModel from '../checkout/sequelize/model/order.model';

interface IOptions {
  memoryStorage: boolean;
}

export const initDb = async (options?: IOptions): Promise<Sequelize> => {
  const setupOptions: SequelizeOptions = {
    dialect: 'sqlite',
    storage: 'data/database/data.sqlite',
    logging: false,
  };

  if (options?.memoryStorage) {
    setupOptions.storage = ':memory:';
  }

  const sequelize = new Sequelize(setupOptions);

  sequelize.addModels([
    CustomerModel,
    ProductModel,
    OrderItemModel,
    OrderModel,
  ]);

  await sequelize.sync({ force: true });

  return sequelize;
};
