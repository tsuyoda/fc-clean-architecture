import Product from '../entity/product';
import ProductService from './product.service';

describe('Product service unit tests', () => {
  it('should change the price os all products', () => {
    const product1 = new Product('i1', 'Product 1', 100);
    const product2 = new Product('i2', 'Product 2', 200);

    ProductService.increasePriceAsPercentage([product1, product2], 100);

    expect(product1.price).toBe(200);
    expect(product2.price).toBe(400);
  });

  it('should throw an error when products list parameter have less than 1 item', () => {
    expect(() => {
      ProductService.increasePriceAsPercentage([], 100);
    }).toThrow('Products must have at least 1 item');
  });

  it('should throw an error when percentage parameter is not beetwen 0 and 100', () => {
    const product = new Product('i1', 'Product 1', 100);

    expect(() => {
      ProductService.increasePriceAsPercentage([product], -1);
    }).toThrow('Percentage must be beetwen 0 and 100');

    expect(() => {
      ProductService.increasePriceAsPercentage([product], 101);
    }).toThrow('Percentage must be beetwen 0 and 100');
  });
});
