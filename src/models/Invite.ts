import mongoose from "mongoose";
const Schema = mongoose.Schema;
export interface IInvite extends mongoose.Document {
  inviterId: string;
  inviterEmail: string;
  inviteDate: Date;
  acceptDate: Date;
  orgId: string;
  inviteText: string;
  inviteStatus: string;
  inviteeId: string;
  inviteeEmail: string;
}

const InviteSchema = new Schema(
  {
    inviterId: {
      type: String,
    },
    inviterEmail: {
      type: String,
    },
    inviteDate: {
      type: Date,
    },
    acceptDate: {
      type: Date,
    },
    orgId: {
      type: String,
    },
    inviteText: {
      type: String,
    },
    inviteStatus: {
      type: String,
    },
    inviteeId: {
      type: String,
    },
    inviteeEmail: {
      type: String,
    },
  },
  {
    collection: "invite",
  },
);

export const Invite = mongoose.model<IInvite>("Invite", InviteSchema);
export default Invite;
