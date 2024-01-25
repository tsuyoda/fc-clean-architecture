import ProductFactory from './product.factory';

describe('Product Factory unit tests', () => {
  it('Should create a product A', () => {
    const productA = ProductFactory.create('A', 'Product', 100);

    expect(productA.id).toBeDefined();
    expect(productA.name).toBe('Product');
    expect(productA.price).toBe(100);
  });

  it('Should create a product B', () => {
    const productA = ProductFactory.create('B', 'Product', 100);

    expect(productA.id).toBeDefined();
    expect(productA.name).toBe('Product');
    expect(productA.price).toBe(200);
  });

  it('Should throw an error when type is not implemented', () => {
    expect(() => {
      ProductFactory.create('C', 'Product', 100);
    }).toThrow("Type 'C' is not implemented");
  });
});
