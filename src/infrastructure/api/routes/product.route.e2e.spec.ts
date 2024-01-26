import { Sequelize } from 'sequelize-typescript';
import request from 'supertest';
import { initDb } from '../../db/sequelize';
import { app } from '../express';

describe('Product routes e2e tests', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = await initDb({ memoryStorage: true });
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('Should create a product', async () => {
    const input = {
      name: 'Product',
      price: 100,
    };

    const response = await request(app).post('/product').send({
      name: input.name,
      price: input.price,
    });

    expect(response.status).toBe(201);

    expect(response.body).toStrictEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it('Should update a product', async () => {
    const createResponse = await request(app).post('/product').send({
      name: 'Product',
      price: 100,
    });

    expect(createResponse.status).toBe(201);

    const newInput = {
      id: createResponse.body.id,
      name: 'New Product',
      price: 200,
    };

    const updateResponse = await request(app)
      .put(`/product/${newInput.id}`)
      .send({
        name: newInput.name,
        price: newInput.price,
      });

    expect(updateResponse.body).toStrictEqual({
      id: newInput.id,
      name: newInput.name,
      price: newInput.price,
    });
  });

  it('Should find a product', async () => {
    const input = {
      name: 'Product',
      price: 100,
    };

    const createResponse = await request(app).post('/product').send({
      name: input.name,
      price: input.price,
    });

    expect(createResponse.status).toBe(201);

    const productId = createResponse.body.id;

    const findResponse = await request(app).get(`/product/${productId}`);

    expect(findResponse.body).toStrictEqual({
      id: productId,
      name: input.name,
      price: input.price,
    });
  });

  it('Should list products', async () => {
    const input1 = {
      name: 'Product 1',
      price: 100,
    };

    const input2 = {
      name: 'Product 2',
      price: 200,
    };

    for (const input of [input1, input2]) {
      const createResponse = await request(app).post('/product').send({
        name: input.name,
        price: input.price,
      });

      expect(createResponse.status).toBe(201);
    }

    const findResponse = await request(app).get(`/product`);

    expect(findResponse.status).toBe(200);

    expect(findResponse.body.products.length).toBe(2);

    const [product1, product2] = findResponse.body.products;

    expect(product1).toStrictEqual({
      id: expect.any(String),
      name: input1.name,
      price: input1.price,
    });

    expect(product2).toStrictEqual({
      id: expect.any(String),
      name: input2.name,
      price: input2.price,
    });
  });

  it('should not create a product', async () => {
    const response = await request(app).post('/product').send({});
    expect(response.status).toBe(500);
  });
});
