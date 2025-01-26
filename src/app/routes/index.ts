import { Router } from 'express';
import bikeRouter from '../module/product-model(bike)/product.router';
import orderRoute from '../module/order-model/order.router';

const router = Router();

// app.use('/api/products', bikeRouter); //1. Create a Bike
// app.use('/api/orders', orderRoute); //2.Order A Bike

const moduleRoutes = [
  {
    path: '/products',
    route: bikeRouter,
  },
  {
    path: '/orders',
    route: orderRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;