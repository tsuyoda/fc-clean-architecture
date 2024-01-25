import IProductRepository from '../../../domain/product/repository/product.repository.interface';
import {
  IInputUpdateProductDTO,
  IOutputUpdateProductDTO,
} from './product.update.dto';

export default class ProductUpdateUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(
    input: IInputUpdateProductDTO,
  ): Promise<IOutputUpdateProductDTO> {
    const product = await this.productRepository.find(input.id);
    product.changeName(input.name);
    product.changePrice(input.price);

    await this.productRepository.update(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
