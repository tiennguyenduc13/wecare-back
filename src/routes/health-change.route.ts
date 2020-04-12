import express from "express";
import _ from "lodash";
import HealthChange from "../models/HealthChange";

const healthChangeRoutes = express.Router();

// Defined store route
healthChangeRoutes.route("/add").post((req, res) => {
  const healthChange = new HealthChange(req.body);
  console.log("Adding healthChange");
  healthChange
    .save()
    .then((healthChange) => {
      res.status(200).json(healthChange);
    })
    .catch((err) => {
      res.status(400).send("unable to save to database");
    });
});

healthChangeRoutes.route("/listByUserId/:userId").get((req, res) => {
  const userId = req.params.userId;
  console.log("Get list healthChange: ", userId);
  HealthChange.find({ userId }, (err, healthChanges) => {
    if (err) {
      console.log(err);
    } else {
      res.json(healthChanges);
    }
  });
});

healthChangeRoutes.route("/latest/:userId").get((req, res) => {
  const userId = req.params.userId;
  HealthChange.find({ userId })
    .sort({ eventDate: -1 })
    .limit(1)
    .then((healthChanges) => {
      if (healthChanges && healthChanges.length) {
        res.json(healthChanges[0]);
      } else {
        res.json({});
      }
    });
});

healthChangeRoutes.route("/update/:id").post((req, res) => {
  const id = req.params.id;
  HealthChange.findById(id, (err, next, healthChange) => {
    if (!healthChange) {
      return next(new Error("Could not load HealthChange"));
    } else {
      healthChange.userId = req.body.userId;

      healthChange
        .save()
        .then((healthChange) => {
          res.json(healthChange);
        })
        .catch((err) => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

healthChangeRoutes.route("/delete/:id").post((req, res) => {
  const healthChangeId = req.params.id;
  console.log("Delete ", healthChangeId);

  HealthChange.findByIdAndRemove(
    { _id: healthChangeId },
    (err, healthChange) => {
      console.log("Delete found ", healthChange);
      if (err) {
        res.json(err);
      } else {
        console.log("Delete Ok");
        res.json(healthChangeId);
      }
    },
  );
});
export default healthChangeRoutes;
