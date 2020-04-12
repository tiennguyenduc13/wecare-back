"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Invite_1 = __importDefault(require("../models/Invite"));
const Profile_1 = __importDefault(require("../models/Profile"));
const org_function_1 = __importDefault(require("./org.function"));
const inviteRoutes = express_1.default.Router();
inviteRoutes.route("/add").post((req, res) => {
    const invite = new Invite_1.default(req.body);
    console.log("Adding invite", invite);
    // find inviteeId by inviteeEmail
    Profile_1.default.findOne({ email: invite.inviteeEmail }).then((profile) => {
        console.log("Profile found ", profile);
        if (profile) {
            invite.inviteeId = profile.userId;
            invite
                .save()
                .then((invite) => {
                console.log("Added invite", invite);
                res.status(200).json(invite);
            })
                .catch((err) => {
                console.log("Error ", err);
                res.status(400).send("Unable to save to database");
            });
        }
        else {
            console.log("Not found: ", profile);
            res.status(400).send("Unable to make invitation");
        }
    });
});
inviteRoutes.route("/listByInviterId/:inviterId").get((req, res) => {
    const inviterId = req.params.inviterId;
    console.log("Get list invite inviterId: ", inviterId);
    Invite_1.default.find({ inviterId }, (err, invites) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(invites);
        }
    });
});
inviteRoutes.route("/listByInviteeId/:inviteeId").get((req, res) => {
    const inviteeId = req.params.inviteeId;
    console.log("Get list invites by inviteeId :", inviteeId);
    Invite_1.default.find({ inviteeId }, (err, invites) => {
        if (err) {
            console.log("Error ", err);
        }
        else {
            console.log("Found invites", invites);
            res.json(invites);
        }
    });
});
inviteRoutes.route("/listByInviterId/:inviterId").get((req, res) => {
    const inviterId = req.params.inviterId;
    console.log("Get list invites by inviterId :", inviterId);
    Invite_1.default.find({ inviterId }, (err, invites) => {
        if (err) {
            console.log("Error ", err);
        }
        else {
            console.log("Found invites", invites);
            res.json(invites);
        }
    });
});
inviteRoutes.route("/update/:id").post((req, res) => {
    const id = req.params.id;
    Invite_1.default.findById(id, (err, next, invite) => {
        if (!invite) {
            return next(new Error("Could not load Invite"));
        }
        else {
            invite.inviteStatus = req.body.inviteStatus;
            invite
                .save()
                .then((invite) => {
                res.json(invite);
            })
                .catch((err) => {
                res.status(400).send("unable to update the database");
            });
        }
    });
});
inviteRoutes.route("/acceptInvite/:inviteId").post((req, res) => {
    const inviteId = req.params.inviteId;
    console.log("start acceptInvite inviteId ", inviteId);
    Invite_1.default.findById(inviteId, (err, invite) => {
        if (err) {
            console.log(err);
            res.status(404).send("Unable to updateStatus");
        }
        else {
            if (!invite) {
                res.json({});
            }
            else {
                console.log("acceptInvite found invite: ", invite);
                invite.inviteStatus = "accepted";
                invite
                    .save()
                    .then((invite) => {
                    console.log("acceptInvite saved invite: ", invite);
                    // add invitee to Org
                    org_function_1.default(req, res, invite.inviteeId, invite.orgId);
                })
                    .catch((err) => {
                    res.status(400).send("unable to update the database");
                });
            }
        }
    });
});
inviteRoutes.route("/:inviteId").get((req, res) => {
    const inviteId = req.params.inviteId;
    console.log("load inviteId ", inviteId);
    Invite_1.default.findOne({ _id: inviteId }).then((invite) => {
        console.log("loaded invite ", invite);
        if (invite) {
            res.json(invite);
        }
        else {
            res.json({});
        }
    });
});
exports.default = inviteRoutes;
//# sourceMappingURL=invite.route.js.map