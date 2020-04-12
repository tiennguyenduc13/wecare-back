"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lodash_1 = __importDefault(require("lodash"));
const PositionMap_1 = __importDefault(require("../models/PositionMap"));
const positionMapRoutes = express_1.default.Router();
// Defined get data(index or listing) route
positionMapRoutes.route("/").get(function (req, res) {
    PositionMap_1.default.find(function (err, positionMapes) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(positionMapes);
        }
    });
});
positionMapRoutes.route("/updatePosition/:userId").post(function (req, res) {
    const userId = req.params.userId;
    const position = { lat: req.body.lat, lng: req.body.lng };
    PositionMap_1.default.findOne({ userId }).then((positionMap) => {
        if (positionMap) {
            positionMap.position = position;
            positionMap.eventDate = lodash_1.default.isEmpty(positionMap.eventDate)
                ? new Date()
                : positionMap.eventDate;
            // update
            positionMap
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
            const newPositionMap = new PositionMap_1.default({
                userId,
                position,
                eventDate: new Date(),
            });
            newPositionMap
                .save()
                .then((positionMap) => {
                res.status(200).json({ positionMap });
            })
                .catch((err) => {
                res.status(400).send("unable to save to database");
            });
        }
    });
});
positionMapRoutes.route("/list").get(function (req, res) {
    PositionMap_1.default.find({}, (err, positionMaps) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(positionMaps);
        }
    });
});
positionMapRoutes
    .route("/updateHealthSignals/:userId")
    .post(function (req, res) {
    const userId = req.params.userId;
    const healthSignals = req.body;
    PositionMap_1.default.findOne({ userId }).then((positionMap) => {
        if (positionMap) {
            positionMap.healthSignals = healthSignals;
            positionMap.eventDate = new Date();
            // update
            positionMap
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
            const newPositionMap = new PositionMap_1.default({
                userId,
                healthSignals,
                eventDate: new Date(),
            });
            newPositionMap
                .save()
                .then((positionMap) => {
                res.status(200).json({ positionMap });
            })
                .catch((err) => {
                res.status(400).send("unable to save to database");
            });
        }
    });
});
positionMapRoutes.route("/update/:userId").post(function (req, res) {
    const userIdToUpdate = req.params.userId;
    const positionMapToUpdate = new PositionMap_1.default(req.body);
    PositionMap_1.default.findOne({ userId: userIdToUpdate }).then((positionMap) => {
        if (positionMap) {
            positionMap.position = positionMapToUpdate.position;
            positionMap.eventDate = positionMapToUpdate.eventDate;
            positionMap.healthSignals = positionMapToUpdate.healthSignals;
            // update
            positionMap
                .save()
                .then((positionMap) => {
                res.json(positionMap);
            })
                .catch((err) => {
                res.status(400).send("unable to update the database");
            });
        }
        else {
            // add new
            positionMapToUpdate
                .save()
                .then((positionMap) => {
                res.status(200).json({ positionMap });
            })
                .catch((err) => {
                res.status(400).send("unable to save to database");
            });
        }
    });
});
// Defined delete | remove | destroy route
positionMapRoutes.route("/delete/:id").get(function (req, res) {
    PositionMap_1.default.findByIdAndRemove({ _id: req.params.id }, function (err, positionMap) {
        if (err) {
            res.json(err);
        }
        else {
            res.json("Successfully removed");
        }
    });
});
exports.default = positionMapRoutes;
//# sourceMappingURL=position-map.route.js.map