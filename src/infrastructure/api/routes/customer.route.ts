import express, { Request, Response } from 'express';
import CustomerRepository from '../../customer/repository/customer.repository';
import CustomerCreateUseCase from '../../../use_case/customer/create/customer.create.useCase';
import { IInputCreateCustomerDTO } from '../../../use_case/customer/create/customer.create.dto';
import { IInputUpdateCustomerDTO } from '../../../use_case/customer/update/customer.update.dto';
import CustomerUpdateUseCase from '../../../use_case/customer/update/customer.update.useCase';
import CustomerFindUseCase from '../../../use_case/customer/find/customer.find.useCase';
import { IInputFindCustomerDTO } from '../../../use_case/customer/find/customer.find.dto';
import CustomerListUseCase from '../../../use_case/customer/list/customer.list.useCase';
import { IInputListCustomerDTO } from '../../../use_case/customer/list/customer.list.dto';

export const customerRoute = express.Router();

const customerRepository = new CustomerRepository();

customerRoute.post('/', async (req: Request, res: Response) => {
  try {
    const useCase = new CustomerCreateUseCase(customerRepository);

    const inputDTO: IInputCreateCustomerDTO = {
      name: req.body.name,
      address: req.body.address,
    };

    const customer = await useCase.execute(inputDTO);

    res.status(201).json(customer);
  } catch (err: any) {
    res.status(500).json({
      status: 500,
      error: err.message,
    });
  }
});

customerRoute.put('/:customerId', async (req: Request, res: Response) => {
  try {
    const useCase = new CustomerUpdateUseCase(customerRepository);

    const inputDTO: IInputUpdateCustomerDTO = {
      id: req.params.customerId,
      name: req.body.name,
      address: req.body.address,
    };

    const customer = await useCase.execute(inputDTO);

    res.status(200).json(customer);
  } catch (err: any) {
    if (err instanceof Error && err.message === 'Customer not found') {
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

customerRoute.get('/:customerId', async (req: Request, res: Response) => {
  try {
    const useCase = new CustomerFindUseCase(customerRepository);

    const inputDTO: IInputFindCustomerDTO = {
      id: req.params.customerId,
    };

    const customer = await useCase.execute(inputDTO);

    res.status(200).json(customer);
  } catch (err: any) {
    if (err instanceof Error && err.message === 'Customer not found') {
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

customerRoute.get('/', async (req: Request, res: Response) => {
  try {
    const useCase = new CustomerListUseCase(customerRepository);

    const inputDTO: IInputListCustomerDTO = {};

    const customer = await useCase.execute(inputDTO);

    res.status(200).json(customer);
  } catch (err: any) {
    res.status(500).json({
      status: 500,
      error: err.message,
    });
  }
});
