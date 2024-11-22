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
  //search a bike name, category, brand jodi original satha match na kora toba error dakha ba
  if (!result || result.length === 0) {
    throw new Error('No matching bikes found');
  }
  return result;
};

//3. Get a Specific Bike
const getSpecificBikes = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

//4. Update a Bike
const updateBike = async (id: string, data: IBike) => {
  //specific bike update id and this bike all get data mean IBike
  const result = await Product.findByIdAndUpdate(id, data, {
    new: true,
  }); // new: true; use when user update data than new update data not show previous data
  return result;
};

//5. Delete a Bike
const deleteBike = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const productService = {
  createABike,
  getAllBikes,
  getSpecificBikes,
  updateBike,
  deleteBike,
};
