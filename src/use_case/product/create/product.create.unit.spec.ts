import ProductRepository from '../../../infrastructure/product/repository/product.repository';
import ProductCreateUseCase from './product.create.useCase';

jest.mock('../../../infrastructure/product/repository/product.repository');

describe('Product create use case unit tests', () => {
  it('Should create a product', async () => {
    const productRepository = new ProductRepository();
    const useCase = new ProductCreateUseCase(productRepository);

    const input = {
      name: 'Product',
      price: 100,
    };

    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it('Should throw an error when name is missing', async () => {
    const productRepository = new ProductRepository();
    const useCase = new ProductCreateUseCase(productRepository);

    const input = {
      name: '',
      price: 100,
    };

    expect(useCase.execute(input)).rejects.toThrow('Name is required');
  });

  it('Should throw an error when price less or equal than 0', async () => {
    const productRepository = new ProductRepository();
    const useCase = new ProductCreateUseCase(productRepository);

    const input = {
      name: 'Product',
      price: -1,
    };

    expect(useCase.execute(input)).rejects.toThrow(
      'Price must be greater or equal than 0',
    );
  });
});
