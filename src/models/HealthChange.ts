import mongoose from "mongoose";
const Schema = mongoose.Schema;
interface IHealthChange extends mongoose.Document {
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

// const Business = mongoose.model<IBusiness>("Business", BusinessSchema);
const HealthChange = mongoose.model<IHealthChange>(
  "HealthChange",
  HealthChangeSchema,
);
export default HealthChange;
