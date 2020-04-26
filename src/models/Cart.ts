import mongoose from "mongoose";
const Schema = mongoose.Schema;

//user:cart = 1:1
export interface ICart extends mongoose.Document {
  userId: string;
  userName: string;
  eventDate: Date;
  cartItems: {
    productId: string;
    quantity: number;
    price: number;
    tax: number;
    cost: number;
  };
  total: number;
  //   cartStatus: string; //initial, placed
}

const CartSchema = new Schema(
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
    cartItems: {
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
    // cartStatus: {
    //   type: String,
    //   enum: ["initial", "placed"],
    //   default: "initial",
    // },
  },
  {
    collection: "cart",
  }
);

export const Cart = mongoose.model<ICart>("Cart", CartSchema);
export default Cart;
