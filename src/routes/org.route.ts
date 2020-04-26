import express from "express";
import _ from "lodash";
import HealthChange from "../models/HealthChange";
import Org from "../models/Org";
import Profile from "../models/Profile";
import addMemberToOrg from "./org.function";
import * as util from "../common/util";

const orgRoutes = express.Router();

orgRoutes.route("/add").post((req, res) => {
  const org = new Org(req.body);
  const creatorId = org.creatorId;
  if (!_.isEmpty(creatorId)) {
    org.eventDate = util.isNullDate(org.eventDate) ? new Date() : org.eventDate;
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
  } else {
    console.log("Error adding org: no creator");
    res.status(200).json({});
  }
});

orgRoutes.route("/addMember/:orgId/:memberId").post((req, res) => {
  const orgId = req.params.orgId;
  const memberId = req.params.memberId;
  console.log("Adding member to org", memberId, orgId);
  addMemberToOrg(req, res, memberId, orgId);
});

orgRoutes.route("/listByCreator/:creatorId").get((req, res) => {
  const creatorId = req.params.creatorId;
  let filter = {};
  if (creatorId) {
    filter = { creatorId };
  }
  console.log("Get list org filter: ", filter);
  Org.find(filter, (err, orgs) => {
    if (err) {
      console.log(err);
    } else {
      res.json(orgs);
    }
  });
});

orgRoutes.route("/:orgId").get((req, res) => {
  const orgId = req.params.orgId;
  if (orgId) {
    console.log("Find org : ", orgId);
    Org.findById(orgId, (err, org) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Found org : ", org);
        res.json(org);
      }
    });
  } else {
    res.json({});
  }
});

orgRoutes.route("/listByMember/:memberId").get((req, res) => {
  const memberId = req.params.memberId;
  let filter = {};
  if (memberId) {
    filter = { members: memberId };
  }
  console.log("Get list org filter: ", filter);
  Org.find(filter, (err, orgs) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Found list org : ", orgs);
      res.json(orgs);
    }
  });
});

orgRoutes.route("/listExceptMember/:memberId").get((req, res) => {
  const memberId = req.params.memberId;
  let filter = {};
  if (memberId) {
    filter = { members: { $ne: memberId } };
  }
  console.log("Get list org filter: ", filter);
  Org.find(filter, (err, orgs) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Found ", orgs);
      res.json(orgs);
    }
  });
});

orgRoutes.route("/members/:orgId/:memberId").get(async (req, res) => {
  const orgId = req.params.orgId;
  const memberId = req.params.memberId;
  const filter = {
    _id: orgId,
    members: memberId,
  };
  console.log("Get list members filter: ", filter);
  const org = await Org.findOne(filter, (err, org) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Found org", org);
      return org;
    }
  });
  const profilesPromises = await _.map(
    org.members,
    async (memberId: string) => {
      return await Profile.findOne(
        {
          userId: memberId,
        },
        (err, profile) => {
          if (err) {
            console.log(err);
            return {};
          } else {
            console.log("Found profile", profile);
            return profile;
          }
        }
      );
    }
  );
  const profiles = await Promise.all(profilesPromises);
  const cloneObjs = [];
  const promises = await _.map(profiles, async (profile) => {
    const healthChanges = await HealthChange.find({
      userId: profile.userId,
    })
      .sort({
        eventDate: -1,
      })
      .limit(1);
    const healthSignals =
      healthChanges && healthChanges.length
        ? healthChanges[0].healthSignals
        : [];

    const cloneObj = {
      userId: profile.userId,
      name: profile.name,
      email: profile.email,
      healthSignals,
    };
    cloneObjs.push(cloneObj);
    return cloneObj;
  });
  const members = await Promise.all(promises);
  res.json(members);
});

orgRoutes.route("/deleteByCreatorId/:orgId/:creatorId").post((req, res) => {
  const orgId = req.params.orgId;
  const creatorId = req.params.creatorId;
  console.log("Delete ", orgId, creatorId);
  Org.findOneAndRemove({ _id: orgId, creatorId }, (err, org) => {
    if (err) {
      res.json(err);
    } else {
      console.log("Deleted org");
      res.json(org);
    }
  });
});

export default orgRoutes;
