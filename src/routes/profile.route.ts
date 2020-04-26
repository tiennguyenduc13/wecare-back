import express from "express";
import _ from "lodash";
import Profile from "../models/Profile";
import * as util from "../common/util";

const profileRoutes = express.Router();

profileRoutes.route("/updateProfile/:userId").post((req, res) => {
  const userId = req.params.userId;
  const profileParam = new Profile({
    userId,
    email: req.body.email,
    name: req.body.name,
    cellPhone: req.body.cellPhone,
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender,
  });
  console.log("Doing updateProfile profileParam", profileParam);
  Profile.findOne({ userId }).then((profile) => {
    console.log("updateProfile found ", profile);
    if (profile) {
      profile.email = profileParam.email;
      profile.name = profileParam.name;
      profile.eventDate = util.isNullDate(profile.eventDate)
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
    } else {
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
  Profile.findOne({ userId }).then((profile) => {
    console.log("loaded profile ", profile);
    if (profile) {
      res.json(profile);
    } else {
      res.json({});
    }
  });
});

export default profileRoutes;
