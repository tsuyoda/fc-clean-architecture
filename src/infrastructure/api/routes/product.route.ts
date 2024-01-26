import express, { Request, Response } from 'express';
import ProductRepository from '../../product/repository/product.repository';
import ProductCreateUseCase from '../../../use_case/product/create/product.create.useCase';
import { IInputCreateProductDTO } from '../../../use_case/product/create/product.create.dto';
import ProductUpdateUseCase from '../../../use_case/product/update/product.update.useCase';
import { IInputUpdateProductDTO } from '../../../use_case/product/update/product.update.dto';
import ProductFindUseCase from '../../../use_case/product/find/product.find.useCase';
import { IInputFindProductDTO } from '../../../use_case/product/find/product.find.dto';
import ProductListUseCase from '../../../use_case/product/list/product.list.useCase';
import { IInputListProductDTO } from '../../../use_case/product/list/product.list.dto';

export const productRoute = express.Router();

const productRepository = new ProductRepository();

productRoute.post('/', async (req: Request, res: Response) => {
  try {
    const useCase = new ProductCreateUseCase(productRepository);

    const inputDTO: IInputCreateProductDTO = {
      name: req.body.name,
      price: req.body.price,
    };

    const product = await useCase.execute(inputDTO);

    res.status(201).json(product);
  } catch (err: any) {
    res.status(500).json({
      status: 500,
      error: err.message,
    });
  }
});

productRoute.put('/:productId', async (req: Request, res: Response) => {
  try {
    const useCase = new ProductUpdateUseCase(productRepository);

    const inputDTO: IInputUpdateProductDTO = {
      id: req.params.productId,
      name: req.body.name,
      price: req.body.price,
    };

    const product = await useCase.execute(inputDTO);

    res.status(200).json(product);
  } catch (err: any) {
    if (err instanceof Error && err.message === 'Product not found') {
      return res.status(404).json({
        status: 404,
        error: err.message,
      });
    }

    res.status(500).json({
      status: 500,
      error: err.message,
    });
  }
});

productRoute.get('/:productId', async (req: Request, res: Response) => {
  try {
    const useCase = new ProductFindUseCase(productRepository);

    const inputDTO: IInputFindProductDTO = {
      id: req.params.productId,
    };

    const product = await useCase.execute(inputDTO);

    res.status(200).json(product);
  } catch (err: any) {
    if (err instanceof Error && err.message === 'Product not found') {
      return res.status(404).json({
        status: 404,
        error: err.message,
      });
    }

    res.status(500).json({
      status: 500,
      error: err.message,
    });
  }
});

productRoute.get('/', async (req: Request, res: Response) => {
  try {
    const useCase = new ProductListUseCase(productRepository);

    const inputDTO: IInputListProductDTO = {};

    const product = await useCase.execute(inputDTO);

    res.status(200).json(product);
  } catch (err: any) {
    res.status(500).json({
      status: 500,
      error: err.message,
    });
  }
});
