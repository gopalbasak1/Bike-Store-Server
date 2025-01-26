import AppError from '../../errors/AppErrors';
import Product from '../product-model(bike)/product.model';
import { iOrder } from './order.interface';
import Order from './order.model';
import httpStatus from 'http-status-codes';

//1. Order a Bike;
const orderABike = async (payload: iOrder): Promise<iOrder> => {
  const userEmail = payload.email;
  //if the email is not provided or the is not a valid email address, throw an error
  if (!userEmail || !userEmail.includes('@')) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid email address');
  }

  // Find the product by id
  //If the product does not exist, throw an error

  const product = await Product.findById(payload.product);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }
  //If the product is out of stock or the requested quantity exceeds available stock:
  if (!product.inStock || product.quantity < payload.quantity) {
    throw new AppError(httpStatus.INSUFFICIENT_STORAGE, 'Insufficient stock');
  }

  // Reduce inventory product.quantity - request.quantity
  product.quantity -= payload.quantity;
  //If the inventory reaches zero,
  if (product.quantity === 0) {
    product.inStock = false;
  }
  //Save the updated product data
  await product.save();

  // Calculate total price
  const totalPrice = product.price * payload.quantity;

  // Create a new order in the database with the calculated totalPrice and other order details ae ta sas a korta hoba
  const order = await Order.create({
    ...payload,
    totalPrice,
  });
  return order;
};

const allOrderBike = async (payload: object) => {
  const result = await Order.find(payload);
  return result;
};

const updateOrderIntoDB = async (id: string, payload: Partial<iOrder>) => {
  const result = await Order.findOneAndUpdate(
    {
      _id: id,
    },
    payload,
    {
      new: true,
    },
  );
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found');
  }
  return result;
};

const deleteOrderFromDB = async (id: string) => {
  const result = await Order.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found');
  }
  return result;
  //console.log(result);
};

//2. Calculate Revenue from Orders (Aggregation)
const calculateRevenue = async () => {
  //order collection thaka aggregation korta hoba
  const revenueData = await Order.aggregate([
    {
      $group: {
        _id: null, // Grouping all documents
        totalRevenue: { $sum: '$totalPrice' }, //doc sob totalPrice field jog kora dibo
      },
    },
  ]);
  //(revenueData[0])The first object in the array (index 0) contains the calculated totalRevenue.
  //If no orders exist, it defaults to [0] unless undefined
  //revenueData = [{ _id: null, totalRevenue: 3600 }];
  return revenueData[0]?.totalRevenue || 0;
  // revenueData[0] exists, and revenueData[0].totalRevenue = 3600
  // Returns: 3600
};

export const orderService = {
  orderABike,
  calculateRevenue,
  updateOrderIntoDB,
  allOrderBike,
  deleteOrderFromDB,
};
