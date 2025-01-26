/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { orderService } from './order.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';

const orderABike = catchAsync(async (req, res) => {
  const { email, product: productId, quantity } = req.body;
  const payload = { email, product: productId, quantity };
  const result = await orderService.orderABike(payload);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

const allOrderBike = catchAsync(async (req: Request, res: Response) => {
  const payload = req.params;
  const result = await orderService.allOrderBike(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All orders reprieved successfully',
    data: result,
  });
});

const updateOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const result = await orderService.updateOrderIntoDB(orderId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order updated successfully',
    data: result,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const result = await orderService.deleteOrderFromDB(orderId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is deleted successfully',
    data: result,
  });
});

const calculateRevenue = async (_req: Request, res: Response) => {
  const totalRevenue = await orderService.calculateRevenue();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Revenue calculated successfully',
    data: totalRevenue,
  });
};

export const orderController = {
  orderABike,
  calculateRevenue,
  allOrderBike,
  deleteOrder,
  updateOrder,
};
