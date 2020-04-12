import express from "express";
import Business from "../models/Business";
const businessRoutes = express.Router();

businessRoutes.route("/add").post((req, res) => {
  console.log("ttt req.body", req.body);
  const business = new Business(req.body);
  business
    .save()
    .then((business) => {
      res.status(200).json({ business: "business in added successfully" });
    })
    .catch((err) => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
businessRoutes.route("/").get((req, res) => {
  Business.find((err, businesses) => {
    if (err) {
      console.log(err);
    } else {
      res.json(businesses);
    }
  });
});

// Defined edit route
businessRoutes.route("/edit/:id").get((req, res) => {
  const id = req.params.id;
  Business.findById(id, (err, business) => {
    res.json(business);
  });
});

//  Defined update route
businessRoutes.route("/update/:id").post((req, res) => {
  Business.findById(req.params.id, (err, next, business) => {
    if (!business) {
      return next(new Error("Could not load Document"));
    } else {
      business.name = req.body.person_name;
      business.business_name = req.body.business_name;
      business.number = req.body.business_gst_number;

      business
        .save()
        .then((business) => {
          res.json("Update complete");
        })
        .catch((err) => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
businessRoutes.route("/delete/:id").get((req, res) => {
  Business.findByIdAndRemove({ _id: req.params.id }, (err, business) => {
    if (err) {
      res.json(err);
    } else {
      res.json("Successfully removed");
    }
  });
});

export default businessRoutes;
