"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lodash_1 = __importDefault(require("lodash"));
const PositionMap_1 = __importDefault(require("../models/PositionMap"));
const positionMapRoutes = express_1.default.Router();
positionMapRoutes.route("/").get((req, res) => {
    PositionMap_1.default.find((err, positionMapes) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(positionMapes);
        }
    });
});
positionMapRoutes.route("/updatePosition/:userId").post((req, res) => {
    const userId = req.params.userId;
    const position = { lat: req.body.lat, lng: req.body.lng };
    PositionMap_1.default.findOne({ userId }).then((positionMap) => {
        if (positionMap) {
            positionMap.position = position;
            positionMap.localAddress = {
                city: "",
                county: "",
                state: "",
                country: "",
            };
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
positionMapRoutes.route("/list").get((req, res) => {
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
    .route("/countByLocalAddress/:userId/:healthSignal")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const healthSignal = req.params.healthSignal;
    console.log("countByLocalAddress", userId, healthSignal);
    const positionMap = yield PositionMap_1.default.findOne({ userId });
    const filterCity = {
        healthSignals: healthSignal,
        "localAddress.city": positionMap.localAddress.city,
    };
    const filterCounty = {
        healthSignals: healthSignal,
        "localAddress.city": positionMap.localAddress.city,
    };
    const filterState = {
        healthSignals: healthSignal,
        "localAddress.city": positionMap.localAddress.city,
    };
    const cityCount = yield PositionMap_1.default.find(filterCity).countDocuments();
    const countyCount = yield PositionMap_1.default.find(filterCounty).countDocuments();
    const stateCount = yield PositionMap_1.default.find(filterState).countDocuments();
    const resData = {
        city: {
            name: positionMap.localAddress.city,
            count: cityCount,
        },
        county: {
            name: positionMap.localAddress.county,
            count: countyCount,
        },
        state: {
            name: positionMap.localAddress.state,
            count: stateCount,
        },
    };
    res.status(200).json(resData);
}));
positionMapRoutes.route("/updateHealthSignals/:userId").post((req, res) => {
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
positionMapRoutes.route("/update/:userId").post((req, res) => {
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
positionMapRoutes.route("/delete/:id").get((req, res) => {
    PositionMap_1.default.findByIdAndRemove({ _id: req.params.id }, (err, positionMap) => {
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