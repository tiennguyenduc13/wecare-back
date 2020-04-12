"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Message_1 = __importDefault(require("../models/Message"));
const messageRoutes = express_1.default.Router();
messageRoutes.route("/add").post((req, res) => {
    const message = new Message_1.default(req.body);
    console.log("Adding message", message);
    message
        .save()
        .then((message) => {
        console.log("Added message", message);
        res.status(200).json(message);
    })
        .catch((err) => {
        console.log("Error ", err);
        res.status(400).send("unable to save to database");
    });
});
messageRoutes.route("/listByOrgId/:orgId").get((req, res) => {
    const orgId = req.params.orgId;
    console.log("Get list message: ", orgId);
    Message_1.default.find({ orgId }, (err, messages) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(messages);
        }
    });
});
exports.default = messageRoutes;
//# sourceMappingURL=message.route.js.map