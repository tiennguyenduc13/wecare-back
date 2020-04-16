"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = __importDefault(require("./config/db"));
const business_route_1 = __importDefault(require("./routes/business.route"));
const health_change_route_1 = __importDefault(require("./routes/health-change.route"));
const invite_route_1 = __importDefault(require("./routes/invite.route"));
const message_route_1 = __importDefault(require("./routes/message.route"));
const org_route_1 = __importDefault(require("./routes/org.route"));
const position_map_route_1 = __importDefault(require("./routes/position-map.route"));
const profile_route_1 = __importDefault(require("./routes/profile.route"));
const setting_route_1 = __importDefault(require("./routes/setting.route"));
const node_schedule_1 = __importDefault(require("node-schedule"));
const position_function_1 = __importDefault(require("./routes/position.function"));
mongoose_1.default.Promise = global.Promise;
mongoose_1.default
    .connect(db_1.default.DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log("Database is connected");
}, (err) => {
    console.log("Can not connect to the database" + err);
});
//run update localPosition
const job = node_schedule_1.default.scheduleJob("/10 * * * * *", function () {
    console.log("Calling updateLocalAddress");
    position_function_1.default();
});
const app = express_1.default();
const port = process.env.PORT || 4500;
app.use(body_parser_1.default.json());
app.use(cors_1.default({}));
app.use("/business", business_route_1.default);
app.use("/health-change", health_change_route_1.default);
app.use("/position-map", position_map_route_1.default);
app.use("/profile", profile_route_1.default);
app.use("/setting", setting_route_1.default);
app.use("/org", org_route_1.default);
app.use("/message", message_route_1.default);
app.use("/invite", invite_route_1.default);
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
//# sourceMappingURL=server.js.map