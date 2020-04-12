"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
// Define collection and schema for Org
const OrgSchema = new Schema({
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
}, {
    collection: "org",
});
const Org = mongoose_1.default.model("Org", OrgSchema);
exports.default = Org;
//# sourceMappingURL=Org.js.map