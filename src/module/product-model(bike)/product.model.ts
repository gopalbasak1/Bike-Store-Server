import { model, Schema } from 'mongoose';
import { IBike } from './product.interface';

const productSchema = new Schema<IBike>(
  {
    name: {
      type: String,
      required: [true, 'Please enter bike name'],
      minlength: [3, 'Name must be at least 3 characters, get {VALUE}'],
      maxlength: [50, "Name can't exceed 40 characters, get {VALUE}"],
    },
    brand: {
      type: String,
      required: [true, 'Please enter bike brand name'],
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price must be a positive number'],
    },
    category: {
      type: String,
      enum: {
        values: ['Mountain', 'Road', 'Hybrid', 'Electric'],
        message:
          '{VALUE} is invalid category, Category must be either Mountain, Road, Hybrid, or Electric',
      },
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: [10, 'Name must be at least 3 characters, get {VALUE}'],
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, 'Quantity must be a positive number'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'Please provide valid stock true/false of quantity'],
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  },
);

//define and export the productSchema
const Product = model<IBike>('Product', productSchema);
export default Product;
