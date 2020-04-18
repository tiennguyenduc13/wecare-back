import express from "express";
import _ from "lodash";
import Message from "../models/Message";
import * as util from "../common/util";

const messageRoutes = express.Router();

messageRoutes.route("/add").post((req, res) => {
  const message = new Message(req.body);
  message.eventDate = util.isNullDate(message.eventDate)
    ? new Date()
    : message.eventDate;
  console.log("Adding message", message);
  message
    .save()
    .then((message) => {
      console.log("Added message", message);
      res.status(200).json(message);
    })
    .catch((err) => {
      console.log("Error ", err);
      res.status(400).send("unable to save to database");
    });
});

messageRoutes.route("/listByOrgId/:orgId").get((req, res) => {
  const orgId = req.params.orgId;
  console.log("Get list message: ", orgId);
  Message.find({ orgId }, (err, messages) => {
    if (err) {
      console.log(err);
    } else {
      res.json(messages);
    }
  });
});

export default messageRoutes;
