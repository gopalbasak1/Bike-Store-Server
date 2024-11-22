/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { orderService } from './order.service';

const orderABike = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await orderService.orderABike(payload);
    res.status(200).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json({
      message: error.message || 'Order creation failed',
      status: false,
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
};
