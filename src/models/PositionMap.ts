import mongoose from "mongoose";
const Schema = mongoose.Schema;
export interface IPositionMap extends mongoose.Document {
  userId: string;
  eventDate: Date;
  healthSignals: string[];
  position: {
    lat: number;
    lng: number;
  };
}

const PositionMapSchema = new Schema(
  {
    userId: {
      type: String,
    },
    eventDate: {
      type: Date,
    },
    healthSignals: {
      type: [String],
    },
    position: {
      lat: Number,
      lng: Number,
    },
  },
  {
    collection: "position-map",
  },
);

export const PositionMap = mongoose.model<IPositionMap>(
  "PositionMap",
  PositionMapSchema,
);
export default PositionMap;
