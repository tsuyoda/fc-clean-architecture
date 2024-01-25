import Product from '../../../domain/product/entity/product';
import ProductRepository from '../../../infrastructure/product/repository/product.repository';
import { v4 as uuid } from 'uuid';
import ProductFindUseCase from './product.find.useCase';

jest.mock('../../../infrastructure/product/repository/product.repository');

describe('Product find use case unit tests', () => {
  it('should find a product', async () => {
    const product = new Product(uuid(), 'Product', 100);

    const productRepository = new ProductRepository();
    const mockFindProduct = jest.mocked(productRepository.find);
    mockFindProduct.mockImplementation(() => Promise.resolve(product));

    const useCase = new ProductFindUseCase(productRepository);

    const input = {
      id: product.id,
    };

    const result = await useCase.execute(input);

    expect(result).toEqual({
      id: expect.any(String),
      name: 'Product',
      price: 100,
    });
  });

  it('should not find a product', async () => {
    const productRepository = new ProductRepository();
    const mockFindProduct = jest.mocked(productRepository.find);
    mockFindProduct.mockImplementation(() => {
      throw new Error('Product not found');
    });

    const useCase = new ProductFindUseCase(productRepository);

    const input = {
      id: '123',
    };

    expect(useCase.execute(input)).rejects.toThrow('Product not found');
  });
});
