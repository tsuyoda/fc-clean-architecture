import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../sequelize/model/product.model';
import ProductRepository from './product.repository';
import { v4 as uuid } from 'uuid';
import Product from '../../../domain/product/entity/product';

describe('Infra Product repository unit tests', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const productRepository = new ProductRepository();

    const product = new Product(uuid(), 'Product', 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({
      where: { id: product.id },
    });

    expect(productModel?.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });

  it('should update a product', async () => {
    const productRepository = new ProductRepository();

    const product = new Product(uuid(), 'Product', 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({
      where: { id: product.id },
    });

    expect(productModel?.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });

    product.changeName('New Product');
    product.changePrice(200);

    await productRepository.update(product);

    const newProductModel = await ProductModel.findOne({
      where: { id: product.id },
    });

    expect(newProductModel?.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });

  it('should find a product', async () => {
    const productRepository = new ProductRepository();

    const product = new Product(uuid(), 'Product', 100);

    await productRepository.create(product);

    const searchedProduct = await productRepository.find(product.id);

    const productModel = await ProductModel.findOne({
      where: { id: product.id },
    });

    expect(productModel?.toJSON()).toStrictEqual({
      id: searchedProduct.id,
      name: searchedProduct.name,
      price: searchedProduct.price,
    });
  });

  it('should find all products', async () => {
    const productRepository = new ProductRepository();

    const product1 = new Product(uuid(), 'Product 1', 100);
    const product2 = new Product(uuid(), 'Product 2', 200);

    await productRepository.create(product1);
    await productRepository.create(product2);

    const searchedProducts = await productRepository.findAll();

    const productsModel = await ProductModel.findAll();

    expect(productsModel.map(product => product.toJSON())).toStrictEqual(
      searchedProducts.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    );
  });

  it('should throw a error when find a product that does not exists', async () => {
    const productRepository = new ProductRepository();

    expect(async () => {
      await productRepository.find(uuid());
    }).rejects.toThrow('Product not found');
  });
});
