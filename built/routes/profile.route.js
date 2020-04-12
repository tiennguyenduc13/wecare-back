"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lodash_1 = __importDefault(require("lodash"));
const Profile_1 = __importDefault(require("../models/Profile"));
const profileRoutes = express_1.default.Router();
profileRoutes.route("/updateProfile/:userId").post((req, res) => {
    const userId = req.params.userId;
    const profileParam = new Profile_1.default({
        userId,
        email: req.body.email,
        name: req.body.name,
        cellPhone: req.body.cellPhone,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
    });
    console.log("Doing updateProfile profileParam", profileParam);
    Profile_1.default.findOne({ userId }).then((profile) => {
        console.log("updateProfile found ", profile);
        if (profile) {
            profile.email = profileParam.email;
            profile.name = profileParam.name;
            profile.eventDate = lodash_1.default.isEmpty(profile.eventDate)
                ? new Date()
                : profile.eventDate;
            profile.cellPhone = profileParam.cellPhone;
            profile.dateOfBirth = profileParam.dateOfBirth;
            profile.gender = profileParam.gender;
            console.log("updateProfile save profile ", profile);
            // update
            profile
                .save()
                .then((resData) => {
                console.log("updateProfile save profile done", resData);
                res.status(200).json(resData);
            })
                .catch((err) => {
                console.log("Error ", err);
                res.status(400).send("unable to save to database");
            });
        }
        else {
            // add new
            profileParam.eventDate = new Date();
            console.log("updateProfile add new profileParam ", profileParam);
            profileParam
                .save()
                .then((profile) => {
                console.log("updateProfile add new done profile ", profile);
                res.status(200).json({ profile });
            })
                .catch((err) => {
                console.log("Error ", err);
                res.status(400).send("unable to save to database");
            });
        }
    });
});
profileRoutes.route("/:userId").get((req, res) => {
    const userId = req.params.userId;
    console.log("load profile ", userId);
    Profile_1.default.findOne({ userId }).then((profile) => {
        console.log("loaded profile ", profile);
        if (profile) {
            res.json(profile);
        }
        else {
            res.json({});
        }
    });
});
exports.default = profileRoutes;
//# sourceMappingURL=profile.route.js.map