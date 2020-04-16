"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const PositionMapSchema = new Schema({
    userId: {
        type: String,
    },
    eventDate: {
        type: Date,
    },
    healthSignals: {
        type: [String],
    },
    position: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        },
    },
    localAddress: {
        city: {
            type: String,
            default: "",
        },
        county: {
            type: String,
            default: "",
        },
        state: {
            type: String,
            default: "",
        },
        country: {
            type: String,
            default: "",
        },
    },
}, {
    collection: "position-map",
});
exports.PositionMap = mongoose_1.default.model("PositionMap", PositionMapSchema);
exports.default = exports.PositionMap;
//# sourceMappingURL=PositionMap.js.map