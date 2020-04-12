import mongoose from "mongoose";
const Schema = mongoose.Schema;
interface IOrg extends mongoose.Document {
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

const Org = mongoose.model<IOrg>("Org", OrgSchema);
export default Org;
