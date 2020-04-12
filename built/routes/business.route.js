"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Business_1 = __importDefault(require("../models/Business"));
const businessRoutes = express_1.default.Router();
businessRoutes.route("/add").post((req, res) => {
    console.log("ttt req.body", req.body);
    const business = new Business_1.default(req.body);
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
    Business_1.default.find((err, businesses) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(businesses);
        }
    });
});
// Defined edit route
businessRoutes.route("/edit/:id").get((req, res) => {
    const id = req.params.id;
    Business_1.default.findById(id, (err, business) => {
        res.json(business);
    });
});
//  Defined update route
businessRoutes.route("/update/:id").post((req, res) => {
    Business_1.default.findById(req.params.id, (err, next, business) => {
        if (!business) {
            return next(new Error("Could not load Document"));
        }
        else {
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
    Business_1.default.findByIdAndRemove({ _id: req.params.id }, (err, business) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json("Successfully removed");
        }
    });
});
exports.default = businessRoutes;
//# sourceMappingURL=business.route.js.map