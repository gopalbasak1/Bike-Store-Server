import Router from 'express';
import { orderController } from './order.controller';

const orderRoute = Router();

orderRoute.post('/order-bike', orderController.orderABike);
orderRoute.get('/', orderController.orderABike);
orderRoute.get('/revenue', orderController.calculateRevenue);

export default orderRoute;
