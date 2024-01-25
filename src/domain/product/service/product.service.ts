import Product from '../entity/product';

export default class ProductService {
  static increasePriceAsPercentage(products: Product[], percentage: number) {
    if (products.length === 0) {
      throw new Error('Products must have at least 1 item');
    }

    if (percentage < 0 || percentage > 100) {
      throw new Error('Percentage must be beetwen 0 and 100');
    }

    products.forEach(product => {
      product.changePrice(product.price + (product.price * percentage) / 100);
    });
  }
}
