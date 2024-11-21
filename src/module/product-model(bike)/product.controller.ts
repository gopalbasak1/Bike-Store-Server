//req and res manage

import { Request, Response } from 'express';
import Product from './product.model';

const createABike = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await Product.create(payload);

    //res status
    res.status(200).json({
      status: true,
      message: 'Bike created Successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

export const productController = {
  createABike,
};
