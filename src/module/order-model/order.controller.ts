/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { orderService } from './order.service';

const orderABike = async (req: Request, res: Response) => {
  try {
    const { email, product: productId, quantity } = req.body;
    // Validate the payload
    if (!email || !productId || !quantity || quantity <= 0) {
      res.status(400).json({
        message: 'Invalid request data',
        status: false,
      });
    }

    const payload = { email, product: productId, quantity };
    const result = await orderService.orderABike(payload);
    res.status(200).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message || 'Order creation failed',
      status: false,
    });
  }
};

const allOrderBike = async (req: Request, res: Response) => {
  try {
    const payload = req.params;
    const result = await orderService.allOrderBike(payload);
    res.status(200).json({
      message: 'All orders bikes retrieved successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || 'Validation failed',
      status: false,
      error: error.message,
    });
  }
};

const calculateRevenue = async (_req: Request, res: Response) => {
  try {
    const totalRevenue = await orderService.calculateRevenue();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: { totalRevenue },
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to calculate revenue',
      status: false,
      error: error.message,
    });
  }
};

export const orderController = {
  orderABike,
  calculateRevenue,
  allOrderBike,
};
