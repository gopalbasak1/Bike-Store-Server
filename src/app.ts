import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bikeRouter from './app/module/product-model(bike)/product.router';
import orderRoute from './app/module/order-model/order.router';
import globalErrorHandler from './app/middleware/globalErrorhandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';

const app: Application = express();

//parsers/middleware
app.use(express.json());
app.use(cors());

//router connector
app.use('/api', router);

//server live
app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server on live 🏃🏾‍♀️‍➡️',
  });
});

//Error Handler
app.use(globalErrorHandler);
//Not Found
app.use(notFound);

export default app;
