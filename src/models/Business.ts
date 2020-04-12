import mongoose from "mongoose";

const Schema = mongoose.Schema;
interface IBusiness extends mongoose.Document {
  name: string;
  number: number;
}

const BusinessSchema = new Schema(
  {
    name: {
      type: String,
    },
    number: {
      type: Number,
    },
  },
  {
    collection: "business",
  },
);

const Business = mongoose.model<IBusiness>("Business", BusinessSchema);
export default Business;
