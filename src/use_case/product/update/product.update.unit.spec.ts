import Product from '../../../domain/product/entity/product';
import ProductRepository from '../../../infrastructure/product/repository/product.repository';
import ProductUpdateUseCase from './product.update.useCase';

jest.mock('../../../infrastructure/product/repository/product.repository');

describe('Product update use case unit tests', () => {
  const input = {
    id: 'i1',
    name: 'New Product',
    price: 200,
  };

  it('Should update a product', async () => {
    const product = new Product(input.id, input.name, input.price);

    const productRepository = new ProductRepository();
    const mockFindProduct = jest.mocked(productRepository.find);
    mockFindProduct.mockImplementation(() => Promise.resolve(product));

    const useCase = new ProductUpdateUseCase(productRepository);

    const result = await useCase.execute(input);

    expect(result).toStrictEqual(result);
  });

  it('should not find a product', async () => {
    const productRepository = new ProductRepository();
    const mockFindProduct = jest.mocked(productRepository.find);
    mockFindProduct.mockImplementation(() => {
      throw new Error('Product not found');
    });

    const useCase = new ProductUpdateUseCase(productRepository);

    expect(useCase.execute(input)).rejects.toThrow('Product not found');
  });
});
