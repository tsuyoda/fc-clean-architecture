import express from 'express';
import { customerRoute } from './routes/customer.route';
import { productRoute } from './routes/product.route';

export const app = express();

app.use(express.json());

app.use('/customer', customerRoute);
app.use('/product', productRoute);
