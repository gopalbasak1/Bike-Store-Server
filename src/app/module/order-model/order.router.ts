import Router from 'express';
import { orderController } from './order.controller';

const orderRoute = Router();
orderRoute.post('/', orderController.orderABike);
orderRoute.get('/', orderController.allOrderBike);
orderRoute.patch('/:orderId', orderController.updateOrder);
orderRoute.delete('/:orderId', orderController.deleteOrder);
orderRoute.get('/revenue', orderController.calculateRevenue);

export default orderRoute;
