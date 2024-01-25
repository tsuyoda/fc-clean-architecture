import Product from '../../../domain/product/entity/product';
import ProductRepository from '../../../infrastructure/product/repository/product.repository';
import { v4 as uuid } from 'uuid';
import ProductListUseCase from './product.list.useCase';

jest.mock('../../../infrastructure/product/repository/product.repository');

describe('Product list use case unit tests', () => {
  it('Should list products', async () => {
    const product1 = new Product(uuid(), 'Product 1', 100);
    const product2 = new Product(uuid(), 'Product 2', 200);

    const products = [product1, product2];

    const productRepository = new ProductRepository();
    const mockFindAllProducts = jest.mocked(productRepository.findAll);
    mockFindAllProducts.mockImplementation(() => Promise.resolve(products));

    const useCase = new ProductListUseCase(productRepository);

    const result = await useCase.execute({});

    expect(result.products.length).toBe(2);

    expect(result.products).toStrictEqual(
      products.map(product => ({
        id: expect.any(String),
        name: product.name,
        price: product.price,
      })),
    );
  });
});
