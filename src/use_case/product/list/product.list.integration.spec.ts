import Product from '../../../domain/product/entity/product';
import ProductRepository from '../../../infrastructure/product/repository/product.repository';
import { v4 as uuid } from 'uuid';
import ProductListUseCase from './product.list.useCase';
import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infrastructure/product/sequelize/model/product.model';

describe('Product list use case unit tests', () => {
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

  it('Should list products', async () => {
    const product1 = new Product(uuid(), 'Product 1', 100);
    const product2 = new Product(uuid(), 'Product 2', 200);

    const products = [product1, product2];

    const productRepository = new ProductRepository();

    await Promise.all(
      products.map(async product => {
        await productRepository.create(product);
      }),
    );

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
