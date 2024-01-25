import Product from '../../../domain/product/entity/product';
import ProductRepository from '../../../infrastructure/product/repository/product.repository';
import { v4 as uuid } from 'uuid';
import ProductUpdateUseCase from './product.update.useCase';
import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infrastructure/product/sequelize/model/product.model';

describe('Product update use case unit tests', () => {
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

  const input = {
    id: 'i1',
    name: 'New Product',
    price: 200,
  };

  it('Should update a product', async () => {
    const product = new Product(uuid(), 'Product', 100);

    const productRepository = new ProductRepository();

    await productRepository.create(product);

    const useCase = new ProductUpdateUseCase(productRepository);

    input.id = product.id;

    const result = await useCase.execute(input);

    expect(result).toStrictEqual(result);
  });

  it('should not find a product', async () => {
    const productRepository = new ProductRepository();

    const useCase = new ProductUpdateUseCase(productRepository);

    expect(useCase.execute(input)).rejects.toThrow('Product not found');
  });
});
