import IProductRepository from '../../../domain/product/repository/product.repository.interface';
import {
  IInputFindProductDTO,
  IOutputFindProductDTO,
} from './product.find.dto';

export default class ProductFindUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(input: IInputFindProductDTO): Promise<IOutputFindProductDTO> {
    const product = await this.productRepository.find(input.id);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
