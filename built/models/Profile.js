"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ProfileSchema = new Schema({
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
}, {
    collection: "profile",
});
exports.Profile = mongoose_1.default.model("Profile", ProfileSchema);
exports.default = exports.Profile;
//# sourceMappingURL=Profile.js.map