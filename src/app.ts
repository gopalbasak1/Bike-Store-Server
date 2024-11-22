import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bikeRouter from './module/product-model(bike)/product.router';
import orderRoute from './module/order-model/order.router';

const app: Application = express();

//parsers/middleware
app.use(express.json());
app.use(cors());

//router connector
app.use('/api/products', bikeRouter); //1. Create a Bike
app.use('/api/orders', orderRoute); //2.Order A Bike

//server live
app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server on live 🏃🏾‍♀️‍➡️',
  });
});

export default app;
