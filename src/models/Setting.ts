import mongoose from "mongoose";
const Schema = mongoose.Schema;
export interface ISetting extends mongoose.Document {
  userId: string;
  eventDate: Date;
  alertDistance: {
    enabled: boolean;
    radius: number;
  };
}

const SettingSchema = new Schema(
  {
    userId: {
      type: String,
    },
    eventDate: {
      type: Date,
    },
    alertDistance: {
      enabled: {
        type: Boolean,
        default: false,
      },
      radius: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    collection: "setting",
  },
);

export const Setting = mongoose.model<ISetting>("Setting", SettingSchema);
export default Setting;
