import Product from '../../../domain/product/entity/product';
import IProductRepository from '../../../domain/product/repository/product.repository.interface';
import ProductModel from '../sequelize/model/product.model';

export default class ProductRepository implements IProductRepository {
  async create(entity: Product) {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }

  async update(entity: Product) {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      { where: { id: entity.id } },
    );
  }

  async find(id: string) {
    const productModel = await ProductModel.findOne({
      where: { id },
      rejectOnEmpty: true,
    }).catch(() => {
      throw new Error('Product not found');
    });

    return new Product(productModel.id, productModel.name, productModel.price);
  }

  async findAll() {
    const products = await ProductModel.findAll();

    return products.map(
      product => new Product(product.id, product.name, product.price),
    );
  }
}
