import mongoose from "mongoose";
const Schema = mongoose.Schema;
export interface IOrg extends mongoose.Document {
  creatorId: string;
  name: string;
  eventDate: Date;
  description: string;
  members: string[];
}

const OrgSchema = new Schema(
  {
    creatorId: {
      type: String,
    },
    eventDate: {
      type: Date,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    members: {
      type: [String],
    },
  },
  {
    collection: "org",
  },
);

export const Org = mongoose.model<IOrg>("Org", OrgSchema);
export default Org;
