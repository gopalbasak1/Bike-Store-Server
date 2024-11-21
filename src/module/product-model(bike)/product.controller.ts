//req and res manage

import { Request, Response } from 'express';
import { productService } from './product.service';

//1. Create a Bike
const createABike = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await productService.createABike(payload);

    //res status
    res.status(200).json({
      status: true,
      message: 'Bike created Successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'ValidationError',
      error: error,
    });
  }
};

//2. Get All Bikes
const getAllBikes = async (req: Request, res: Response) => {
  try {
    // Create a query object
    const { searchTerm } = req.query;

    // Search query setup
    let query = {};
    if (searchTerm) {
      const regex = new RegExp(searchTerm as string, 'i'); // Case-insensitive search
      query = {
        $or: [
          { name: regex }, // Search in `name`
          { brand: regex }, // Search in `brand`
          { category: regex }, // Search in `category`
        ],
      };
    }

    const result = await productService.getAllBikes(query);
    res.status(200).json({
      status: true,
      message: 'Bikes retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Validation failed',
      error: error,
    });
  }
};

//3. Get a Specific Bike
const getSpecificBikes = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await productService.getSpecificBikes(productId);
    res.status(200).json({
      status: true,
      message: 'Bikes got successfully',
      result,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Error occurred while fetching bikes',
      error: error,
    });
  }
};

export const productController = {
  createABike,
  getAllBikes,
  getSpecificBikes,
};
