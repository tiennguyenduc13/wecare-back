"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lodash_1 = __importDefault(require("lodash"));
const Setting_1 = __importDefault(require("../models/Setting"));
const settingRoutes = express_1.default.Router();
settingRoutes.route("/updateSetting/:userId").post(function (req, res) {
    const userId = req.params.userId;
    const settingParam = new Setting_1.default({
        userId,
        alertDistance: req.body.alertDistance,
    });
    console.log("updateSetting settingParam", settingParam);
    Setting_1.default.findOne({ userId }).then((setting) => {
        console.log("updateSetting found ", setting);
        if (setting) {
            setting.alertDistance = settingParam.alertDistance;
            settingParam.eventDate = lodash_1.default.isEmpty(settingParam.eventDate)
                ? new Date()
                : settingParam.eventDate;
            console.log("updateSetting save setting ", setting);
            // update
            setting
                .save()
                .then((resData) => {
                res.status(200).json(resData);
            })
                .catch((err) => {
                res.status(400).send("unable to save to database");
            });
        }
        else {
            // add new
            settingParam.eventDate = new Date();
            console.log("updateSetting add new settingParam ", settingParam);
            settingParam
                .save()
                .then((setting) => {
                res.status(200).json({ setting });
            })
                .catch((err) => {
                res.status(400).send("unable to save to database");
            });
        }
    });
});
settingRoutes.route("/:userId").get(function (req, res) {
    const userId = req.params.userId;
    console.log("load setting ", userId);
    Setting_1.default.findOne({ userId }).then((setting) => {
        console.log("loaded setting ", setting);
        if (setting) {
            res.json(setting);
        }
        else {
            res.json({});
        }
    });
});
exports.default = settingRoutes;
//# sourceMappingURL=setting.route.js.map