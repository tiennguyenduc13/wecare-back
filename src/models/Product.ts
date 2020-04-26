import mongoose from "mongoose";
const Schema = mongoose.Schema;
export interface IProduct extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  eventDate: Date;
  imageUrl: string;
  creatorId: string;
  tax: number;
  taxRate: number;
}

const ProductSchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    imageUrl: {
      type: String,
    },
    eventDate: {
      type: Date,
    },
    creatorId: {
      type: String,
    },
    tax: {
      type: Number,
    },
    taxRate: {
      type: Number,
    },
  },
  {
    collection: "product",
  }
);

export const Product = mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
