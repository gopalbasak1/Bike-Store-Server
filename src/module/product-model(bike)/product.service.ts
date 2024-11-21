import { IBike } from './product.interface';
import Product from './product.model';

//1. Create a Bike
const createABike = async (payload: IBike): Promise<IBike> => {
  //this item create only controller define
  const result = await Product.create(payload);
  return result;
};

//2. Get All Bikes
const getAllBikes = async (query: object) => {
  const result = await Product.find(query);
  return result;
};

//3. Get a Specific Bike
const getSpecificBikes = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

//4. Update a Bike
const getUpdateBike = async (id: string, data: IBike) => {
  const result = await Product.findByIdAndUpdate(id, data);
  return result;
};

export const productService = {
  createABike,
  getAllBikes,
  getSpecificBikes,
  getUpdateBike,
};
