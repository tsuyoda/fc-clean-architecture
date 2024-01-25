import Product from './product';

describe('Product unit tests', () => {
  it('Should throw a error when id is empty', () => {
    expect(() => {
      new Product('', 'Product 1', 100);
    }).toThrow('Id is required');
  });

  it('Should throw a error when name is empty', () => {
    expect(() => {
      new Product('i1', '', 100);
    }).toThrow('Name is required');
  });

  it('Should throw a error when price is less than 0', () => {
    expect(() => {
      new Product('i1', 'Product 1', -10);
    }).toThrow('Price must be greater or equal than 0');
  });

  it('Should change name', () => {
    const product = new Product('i1', 'Product 1', 10);

    const changedName = 'Product 2';

    product.changeName(changedName);

    expect(product.name).toBe(changedName);
  });

  it('Should change price', () => {
    const product = new Product('i1', 'Product 1', 10);

    const changedPrice = 20;

    product.changePrice(changedPrice);

    expect(product.price).toBe(changedPrice);
  });
});
