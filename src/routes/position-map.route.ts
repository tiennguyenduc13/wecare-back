import express from "express";
import _ from "lodash";
import PositionMap, { IPositionMap } from "../models/PositionMap";
import * as util from "../common/util";

const positionMapRoutes = express.Router();

positionMapRoutes.route("/").get((req, res) => {
  PositionMap.find((err, positionMapes) => {
    if (err) {
      console.log(err);
    } else {
      res.json(positionMapes);
    }
  });
});

positionMapRoutes.route("/updatePosition/:userId").post((req, res) => {
  const userId = req.params.userId;
  const position = { lat: req.body.lat, lng: req.body.lng };
  PositionMap.findOne({ userId }).then((positionMap) => {
    if (positionMap) {
      positionMap.position = position;
      positionMap.localAddress = {
        city: "",
        county: "",
        state: "",
        country: "",
      };
      positionMap.eventDate = util.isNullDate(positionMap.eventDate)
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
    } else {
      // add new
      const newPositionMap = new PositionMap({
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
  PositionMap.find({}, (err, positionMaps) => {
    if (err) {
      console.log(err);
    } else {
      res.json(positionMaps);
    }
  });
});
positionMapRoutes
  .route("/countByLocalAddress/:userId/:healthSignal")
  .get(async (req, res) => {
    const userId = req.params.userId;
    const healthSignal = req.params.healthSignal;
    console.log("countByLocalAddress", userId, healthSignal);
    const positionMap: IPositionMap = await PositionMap.findOne({ userId });

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
    const cityCount = await PositionMap.find(filterCity).countDocuments();
    const countyCount = await PositionMap.find(filterCounty).countDocuments();
    const stateCount = await PositionMap.find(filterState).countDocuments();
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
  });
positionMapRoutes.route("/updateHealthSignals/:userId").post((req, res) => {
  const userId = req.params.userId;
  const healthSignals = req.body;
  PositionMap.findOne({ userId }).then((positionMap) => {
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
    } else {
      // add new
      const newPositionMap = new PositionMap({
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
  const positionMapToUpdate = new PositionMap(req.body);
  PositionMap.findOne({ userId: userIdToUpdate }).then((positionMap) => {
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
    } else {
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
  PositionMap.findByIdAndRemove({ _id: req.params.id }, (err, positionMap) => {
    if (err) {
      res.json(err);
    } else {
      res.json("Successfully removed");
    }
  });
});

export default positionMapRoutes;
