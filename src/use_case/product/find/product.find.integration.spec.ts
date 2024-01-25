import Product from '../../../domain/product/entity/product';
import ProductRepository from '../../../infrastructure/product/repository/product.repository';
import { v4 as uuid } from 'uuid';
import ProductFindUseCase from './product.find.useCase';
import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infrastructure/product/sequelize/model/product.model';

describe('Product find use case integration tests', () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should find a product', async () => {
    const product = new Product(uuid(), 'Product', 100);

    const productRepository = new ProductRepository();

    await productRepository.create(product);

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

    const useCase = new ProductFindUseCase(productRepository);

    const input = {
      id: '123',
    };

    expect(useCase.execute(input)).rejects.toThrow('Product not found');
  });
});
