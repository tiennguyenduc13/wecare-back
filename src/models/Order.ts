import mongoose from "mongoose";
const Schema = mongoose.Schema;

//user:cart = 1:n
export interface IOrder extends mongoose.Document {
  userId: string;
  userName: string;
  eventDate: Date;
  orderItems: {
    productId: string;
    quantity: number;
    price: number;
    tax: number;
    cost: number;
  };
  total: number;
  orderStatus: string;
}

const OrderSchema = new Schema(
  {
    userId: {
      type: String,
    },
    userName: {
      type: String,
    },
    eventDate: {
      type: Date,
    },
    orderItems: {
      productId: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      price: {
        type: Number,
      },
      tax: {
        type: Number,
      },
      cost: {
        type: Number,
      },
    },
    total: {
      type: Number,
    },
    orderStatus: {
      type: String,
      enum: ["received", "shipping", "delivered"],
      default: "received",
    },
  },
  {
    collection: "order",
  }
);

export const Order = mongoose.model<IOrder>("Order", OrderSchema);
export default Order;
