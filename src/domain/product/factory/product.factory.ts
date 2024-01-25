import Product from '../entity/product';
import { v4 as uuid } from 'uuid';
import ProductB from '../entity/productB';

export default class ProductFactory {
  static create(type: string, name: string, price: number) {
    switch (type) {
      case 'A':
        return new Product(uuid(), name, price);
      case 'B':
        return new ProductB(uuid(), name, price);
      default:
        throw new Error(`Type '${type}' is not implemented`);
    }
  }
}
