import mongoose from "mongoose";
const Schema = mongoose.Schema;
export interface IHealthChange extends mongoose.Document {
  userId: string;
  eventDate: Date;
  healthSignals: string[];
}

const HealthChangeSchema = new Schema(
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
  },
  {
    collection: "health-change",
  },
);

export const HealthChange = mongoose.model<IHealthChange>(
  "HealthChange",
  HealthChangeSchema,
);
export default HealthChange;
