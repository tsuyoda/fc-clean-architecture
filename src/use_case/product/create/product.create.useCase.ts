import Product from '../../../domain/product/entity/product';
import IProductRepository from '../../../domain/product/repository/product.repository.interface';
import {
  IInputCreateProductDTO,
  IOutputCreateProductDTO,
} from './product.create.dto';
import { v4 as uuid } from 'uuid';

export default class ProductCreateUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(
    input: IInputCreateProductDTO,
  ): Promise<IOutputCreateProductDTO> {
    const product = new Product(uuid(), input.name, input.price);

    await this.productRepository.create(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
