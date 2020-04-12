import express from "express";
import _ from "lodash";
import Invite from "../models/Invite";
import Profile from "../models/Profile";
import addMemberToOrg from "./org.function";

const inviteRoutes = express.Router();

inviteRoutes.route("/add").post((req, res) => {
  const invite = new Invite(req.body);
  console.log("Adding invite", invite);
  // find inviteeId by inviteeEmail
  Profile.findOne({ email: invite.inviteeEmail }).then((profile) => {
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
    } else {
      console.log("Not found: ", profile);
      res.status(400).send("Unable to make invitation");
    }
  });
});

inviteRoutes.route("/listByInviterId/:inviterId").get((req, res) => {
  const inviterId = req.params.inviterId;
  console.log("Get list invite inviterId: ", inviterId);
  Invite.find({ inviterId }, (err, invites) => {
    if (err) {
      console.log(err);
    } else {
      res.json(invites);
    }
  });
});

inviteRoutes.route("/listByInviteeId/:inviteeId").get((req, res) => {
  const inviteeId = req.params.inviteeId;
  console.log("Get list invites by inviteeId :", inviteeId);
  Invite.find({ inviteeId }, (err, invites) => {
    if (err) {
      console.log("Error ", err);
    } else {
      console.log("Found invites", invites);
      res.json(invites);
    }
  });
});

inviteRoutes.route("/listByInviterId/:inviterId").get((req, res) => {
  const inviterId = req.params.inviterId;
  console.log("Get list invites by inviterId :", inviterId);
  Invite.find({ inviterId }, (err, invites) => {
    if (err) {
      console.log("Error ", err);
    } else {
      console.log("Found invites", invites);
      res.json(invites);
    }
  });
});

inviteRoutes.route("/update/:id").post((req, res) => {
  const id = req.params.id;
  Invite.findById(id, (err, next, invite) => {
    if (!invite) {
      return next(new Error("Could not load Invite"));
    } else {
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
  Invite.findById(inviteId, (err, invite) => {
    if (err) {
      console.log(err);
      res.status(404).send("Unable to updateStatus");
    } else {
      if (!invite) {
        res.json({});
      } else {
        console.log("acceptInvite found invite: ", invite);
        invite.inviteStatus = "accepted";
        invite
          .save()
          .then((invite) => {
            console.log("acceptInvite saved invite: ", invite);
            // add invitee to Org
            addMemberToOrg(req, res, invite.inviteeId, invite.orgId);
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
  Invite.findOne({ _id: inviteId }).then((invite) => {
    console.log("loaded invite ", invite);
    if (invite) {
      res.json(invite);
    } else {
      res.json({});
    }
  });
});

export default inviteRoutes;
