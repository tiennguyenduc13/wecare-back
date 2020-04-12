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
const Org_1 = __importDefault(require("../models/Org"));
const Profile_1 = __importDefault(require("../models/Profile"));
const org_function_1 = __importDefault(require("./org.function"));
const orgRoutes = express_1.default.Router();
orgRoutes.route("/add").post(function (req, res) {
    const org = new Org_1.default(req.body);
    const creatorId = org.creatorId;
    if (!lodash_1.default.isEmpty(creatorId)) {
        org.eventDate = lodash_1.default.isEmpty(org.eventDate) ? new Date() : org.eventDate;
        org.members.push(creatorId);
        console.log("Adding org ", req.body);
        org
            .save()
            .then((org) => {
            res.status(200).json(org);
        })
            .catch((err) => {
            console.log("Add org err", err);
            res.status(400).send("unable to save to database");
        });
    }
    else {
        console.log("Error adding org: no creator");
        res.status(200).json({});
    }
});
orgRoutes.route("/addMember/:orgId/:memberId").post(function (req, res) {
    const orgId = req.params.orgId;
    const memberId = req.params.memberId;
    console.log("Adding member to org", memberId, orgId);
    org_function_1.default(req, res, memberId, orgId);
});
orgRoutes.route("/listByCreator/:creatorId").get(function (req, res) {
    const creatorId = req.params.creatorId;
    let filter = {};
    if (creatorId) {
        filter = { creatorId };
    }
    console.log("Get list org filter: ", filter);
    Org_1.default.find(filter, (err, orgs) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(orgs);
        }
    });
});
orgRoutes.route("/:orgId").get(function (req, res) {
    const orgId = req.params.orgId;
    if (orgId) {
        console.log("Find org : ", orgId);
        Org_1.default.findById(orgId, (err, org) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Found org : ", org);
                res.json(org);
            }
        });
    }
    else {
        res.json({});
    }
});
orgRoutes.route("/listByMember/:memberId").get(function (req, res) {
    const memberId = req.params.memberId;
    let filter = {};
    if (memberId) {
        filter = { members: memberId };
    }
    console.log("Get list org filter: ", filter);
    Org_1.default.find(filter, (err, orgs) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Found list org : ", orgs);
            res.json(orgs);
        }
    });
});
orgRoutes.route("/listExceptMember/:memberId").get(function (req, res) {
    const memberId = req.params.memberId;
    let filter = {};
    if (memberId) {
        filter = { members: { $ne: memberId } };
    }
    console.log("Get list org filter: ", filter);
    Org_1.default.find(filter, (err, orgs) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Found ", orgs);
            res.json(orgs);
        }
    });
});
orgRoutes.route("/members/:orgId/:memberId").get(function (req, res) {
    const orgId = req.params.orgId;
    const memberId = req.params.memberId;
    const filter = {
        _id: orgId,
        members: memberId,
    };
    console.log("Get list members filter: ", filter);
    Org_1.default.findOne(filter, (err, org) => __awaiter(this, void 0, void 0, function* () {
        if (err) {
            console.log(err);
            res.json({});
        }
        else {
            console.log("Found org", org);
            try {
                const profilesPromises = lodash_1.default.map(org.members, (memberId) => {
                    return Profile_1.default.findOne({ userId: memberId }, (err, profile) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log("Found profile", profile);
                            return profile;
                        }
                    });
                });
                Promise.all(profilesPromises)
                    .then((profiles) => {
                    console.log("Found profiles", profiles);
                    res.json(profiles);
                })
                    .catch((err) => {
                    console.log("Error getting members promises ", err);
                    res.json({});
                });
            }
            catch (err) {
                console.log("Error getting members ", err);
            }
        }
    }));
});
orgRoutes
    .route("/deleteByCreatorId/:orgId/:creatorId")
    .post(function (req, res) {
    const orgId = req.params.orgId;
    const creatorId = req.params.creatorId;
    console.log("Delete ", orgId, creatorId);
    Org_1.default.findOneAndRemove({ _id: orgId, creatorId }, (err, org) => {
        if (err) {
            res.json(err);
        }
        else {
            console.log("Deleted org");
            res.json(org);
        }
    });
});
exports.default = orgRoutes;
//# sourceMappingURL=org.route.js.map