/* eslint-disable @typescript-eslint/no-explicit-any */
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
      message: 'Bike created Successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(error.status || 500).json({
      message: 'Validation failed',
      status: false,
      error: error || 'Something went wrong',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
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
      message: 'Bikes retrieved successfully',
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

//3. Get a Specific Bike
const getSpecificBikes = async (req: Request, res: Response) => {
  try {
    //console.log(req.params); // jodi bujata na pari kon id diya query korta hoba tobaa ae vaba console korta hoba

    //user this product id select than send backend request(id: diya kaj korla params hoba)
    const { productId } = req.params;
    const result = await productService.getSpecificBikes(productId); //ae productId diya single specific bikes find kora hoba

    // If no product is found, return a 404 error
    if (!result) {
      res.status(404).json({
        message: 'This product not found',
        success: false,
        data: {},
      });
    }

    res.status(200).json({
      message: 'Bike retrieved successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Resource not found',
      status: false,
      error: error,
    });
  }
};

//4. Update a Bike
const updateBike = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const body = req.body;
    const result = await productService.updateBike(productId, body);
    res.status(200).json({
      message: 'Bike updated successfully',
      status: true,
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'ValidationError',
      status: false,
      error: error,
    });
  }
};

const deleteBike = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await productService.deleteBike(productId);
    // Check if the bike was deleted
    if (!result) {
      res.status(404).json({
        message: 'Bike not found',
        success: false,
        data: {},
      });
    }
    res.status(200).json({
      message: 'Bike deleted successfully',
      status: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      message: 'ValidationError',
      status: false,
      error: error,
    });
  }
};

export const productController = {
  createABike,
  getAllBikes,
  getSpecificBikes,
  updateBike,
  deleteBike,
};
