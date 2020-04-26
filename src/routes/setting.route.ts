import express from "express";
import _ from "lodash";
import Setting from "../models/Setting";
import * as util from "../common/util";

const settingRoutes = express.Router();

settingRoutes.route("/updateSetting/:userId").post((req, res) => {
  const userId = req.params.userId;
  const settingParam = new Setting({
    userId,
    alertDistance: req.body.alertDistance,
  });
  console.log("updateSetting settingParam", settingParam);
  Setting.findOne({ userId }).then((setting) => {
    console.log("updateSetting found ", setting);
    if (setting) {
      setting.alertDistance = settingParam.alertDistance;
      settingParam.eventDate = util.isNullDate(settingParam.eventDate)
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
    } else {
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

settingRoutes.route("/:userId").get((req, res) => {
  const userId = req.params.userId;
  console.log("load setting ", userId);
  Setting.findOne({ userId }).then((setting) => {
    console.log("loaded setting ", setting);
    if (setting) {
      res.json(setting);
    } else {
      res.json({});
    }
  });
});

export default settingRoutes;
