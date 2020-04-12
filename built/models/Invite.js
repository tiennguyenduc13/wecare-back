"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const InviteSchema = new Schema({
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
}, {
    collection: "invite",
});
const Invite = mongoose_1.default.model("Invite", InviteSchema);
exports.default = Invite;
//# sourceMappingURL=Invite.js.map