import mongoose from 'mongoose';

export interface iOrder {
  email: string;
  product: mongoose.Schema.Types.ObjectId;
  quantity: number;
  totalPrice?: number;
}
