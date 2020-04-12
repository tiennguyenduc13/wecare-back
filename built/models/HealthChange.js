"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const HealthChangeSchema = new Schema({
    userId: {
        type: String,
    },
    eventDate: {
        type: Date,
    },
    healthSignals: {
        type: [String],
    },
}, {
    collection: "health-change",
});
// const Business = mongoose.model<IBusiness>("Business", BusinessSchema);
const HealthChange = mongoose_1.default.model("HealthChange", HealthChangeSchema);
exports.default = HealthChange;
//# sourceMappingURL=HealthChange.js.map