"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const SettingSchema = new Schema({
    userId: {
        type: String,
    },
    eventDate: {
        type: Date,
    },
    alertDistance: {
        enabled: {
            type: Boolean,
            default: false,
        },
        radius: {
            type: Number,
            default: 0,
        },
    },
}, {
    collection: "setting",
});
exports.Setting = mongoose_1.default.model("Setting", SettingSchema);
exports.default = exports.Setting;
//# sourceMappingURL=Setting.js.map