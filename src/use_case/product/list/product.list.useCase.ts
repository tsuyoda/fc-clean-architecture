import IProductRepository from '../../../domain/product/repository/product.repository.interface';
import {
  IInputListProductDTO,
  IOutputListProductDTO,
} from './product.list.dto';

export default class ProductListUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(input: IInputListProductDTO): Promise<IOutputListProductDTO> {
    const products = await this.productRepository.findAll();

    return {
      products: products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
  }
}
