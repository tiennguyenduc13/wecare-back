import mongoose from "mongoose";
const Schema = mongoose.Schema;
export interface IProfile extends mongoose.Document {
  userId: string;
  name: string;
  eventDate: Date;
  email: string;
  cellPhone: string;
  dateOfBirth: Date;
  gender: string;
}

const ProfileSchema = new Schema(
  {
    userId: {
      type: String,
    },
    name: {
      type: String,
    },
    eventDate: {
      type: Date,
    },
    email: {
      type: String,
    },
    cellPhone: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other", "na"],
      default: "na",
    },
  },
  {
    collection: "profile",
  },
);

export const Profile = mongoose.model<IProfile>("Profile", ProfileSchema);
export default Profile;
