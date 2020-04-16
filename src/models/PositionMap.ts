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
  localAddress: {
    city: string;
    county: string;
    state: string;
    country: string;
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
      lat: {
        type: Number,
      },
      lng: {
        type: Number,
      },
    },
    localAddress: {
      city: {
        type: String,
        default: "",
      },
      county: {
        type: String,
        default: "",
      },
      state: {
        type: String,
        default: "",
      },
      country: {
        type: String,
        default: "",
      },
    },
  },
  {
    collection: "position-map",
  }
);

export const PositionMap = mongoose.model<IPositionMap>(
  "PositionMap",
  PositionMapSchema
);
export default PositionMap;
