import { Sequelize } from 'sequelize-typescript';
import request from 'supertest';
import { initDb } from '../../db/sequelize';
import { app } from '../express';

describe('Customer routes e2e tests', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = await initDb({ memoryStorage: true });
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('Should create a customer', async () => {
    const input = {
      name: 'Customer',
      address: {
        street: 'Street',
        number: 10,
        zipcode: 'ZIP',
        city: 'City',
      },
    };

    const response = await request(app)
      .post('/customer')
      .send({
        name: input.name,
        address: {
          street: input.address.street,
          number: input.address.number,
          zipcode: input.address.zipcode,
          city: input.address.city,
        },
      });

    expect(response.status).toBe(201);

    expect(response.body).toStrictEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zipcode: input.address.zipcode,
        city: input.address.city,
      },
    });
  });

  it('Should update a customer', async () => {
    const createResponse = await request(app)
      .post('/customer')
      .send({
        name: 'Customer',
        address: {
          street: 'Street',
          number: 10,
          zipcode: 'Zip',
          city: 'City',
        },
      });

    expect(createResponse.status).toBe(201);

    const newInput = {
      id: createResponse.body.id,
      name: 'New Customer',
      address: {
        street: 'Street 2',
        number: 20,
        zipcode: 'Zip 2',
        city: 'City 2',
      },
    };

    const updateResponse = await request(app)
      .put(`/customer/${newInput.id}`)
      .send({
        name: newInput.name,
        address: {
          street: newInput.address.street,
          number: newInput.address.number,
          zipcode: newInput.address.zipcode,
          city: newInput.address.city,
        },
      });

    expect(updateResponse.body).toStrictEqual({
      id: newInput.id,
      name: newInput.name,
      address: {
        street: newInput.address.street,
        number: newInput.address.number,
        zipcode: newInput.address.zipcode,
        city: newInput.address.city,
      },
    });
  });

  it('Should find a customer', async () => {
    const input = {
      name: 'Customer',
      address: {
        street: 'Street',
        number: 10,
        zipcode: 'ZIP',
        city: 'City',
      },
    };

    const createResponse = await request(app)
      .post('/customer')
      .send({
        name: input.name,
        address: {
          street: input.address.street,
          number: input.address.number,
          zipcode: input.address.zipcode,
          city: input.address.city,
        },
      });

    expect(createResponse.status).toBe(201);

    const customerId = createResponse.body.id;

    const findResponse = await request(app).get(`/customer/${customerId}`);

    expect(findResponse.body).toStrictEqual({
      id: customerId,
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zipcode: input.address.zipcode,
        city: input.address.city,
      },
    });
  });

  it('Should list customers', async () => {
    const input1 = {
      name: 'Customer 1',
      address: {
        street: 'Street 1',
        number: 10,
        zipcode: 'ZIP 1',
        city: 'City 1',
      },
    };

    const input2 = {
      name: 'Customer 2',
      address: {
        street: 'Street 2',
        number: 20,
        zipcode: 'ZIP 2',
        city: 'City 2',
      },
    };

    for (const input of [input1, input2]) {
      const createResponse = await request(app)
        .post('/customer')
        .send({
          name: input.name,
          address: {
            street: input.address.street,
            number: input.address.number,
            zipcode: input.address.zipcode,
            city: input.address.city,
          },
        });

      expect(createResponse.status).toBe(201);
    }

    const findResponse = await request(app).get(`/customer`);

    expect(findResponse.status).toBe(200);

    expect(findResponse.body.customers.length).toBe(2);

    const [customer1, customer2] = findResponse.body.customers;

    expect(customer1).toStrictEqual({
      id: expect.any(String),
      name: input1.name,
      address: {
        street: input1.address.street,
        number: input1.address.number,
        zipcode: input1.address.zipcode,
        city: input1.address.city,
      },
    });

    expect(customer2).toStrictEqual({
      id: expect.any(String),
      name: input2.name,
      address: {
        street: input2.address.street,
        number: input2.address.number,
        zipcode: input2.address.zipcode,
        city: input2.address.city,
      },
    });
  });

  it('should not create a customer', async () => {
    const response = await request(app).post('/customer').send({});
    expect(response.status).toBe(500);
  });
});
