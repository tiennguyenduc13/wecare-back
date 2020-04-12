"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const MessageSchema = new Schema({
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
}, {
    collection: "message",
});
const Message = mongoose_1.default.model("Message", MessageSchema);
exports.default = Message;
//# sourceMappingURL=Message.js.map