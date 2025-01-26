import { model, Schema } from 'mongoose';
import { iOrder } from './order.interface';

const orderSchema = new Schema<iOrder>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Order = model<iOrder>('Order', orderSchema);
export default Order;
