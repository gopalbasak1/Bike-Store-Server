import { Router } from 'express';
import { productController } from './product.controller';

const bikeRouter = Router();

bikeRouter.post('/create-a-bike', productController.createABike);
bikeRouter.get('/', productController.getAllBikes);

export default bikeRouter;
