import { Sequelize } from 'sequelize-typescript';
import ProductRepository from '../../../infrastructure/product/repository/product.repository';
import ProductCreateUseCase from './product.create.useCase';
import ProductModel from '../../../infrastructure/product/sequelize/model/product.model';

describe('Product create use case unit tests', () => {
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
