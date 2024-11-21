import { Router } from 'express';
import { productController } from './product.controller';

const bikeRouter = Router();

bikeRouter.post('/create-a-bike', productController.createABike);

export default bikeRouter;
