import mongoose from "mongoose";
const Schema = mongoose.Schema;
export interface IMessage extends mongoose.Document {
  userId: string;
  userName: string;
  eventDate: Date;
  orgId: string;
  text: string;
}
const MessageSchema = new Schema(
  {
    userId: {
      type: String,
    },
    userName: {
      type: String,
    },
    // tslint:disable-next-line: object-literal-sort-keys
    eventDate: {
      type: Date,
    },
    orgId: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  {
    collection: "message",
  },
);

export const Message = mongoose.model<IMessage>("Message", MessageSchema);
export default Message;
