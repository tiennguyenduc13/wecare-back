import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import config from "./config/db";
import businessRoute from "./routes/business.route";
import healthChangeRoute from "./routes/health-change.route";
import inviteRoute from "./routes/invite.route";
import messageRoute from "./routes/message.route";
import orgRoute from "./routes/org.route";
import positionMapRoute from "./routes/position-map.route";
import profileRoute from "./routes/profile.route";
import settingRoute from "./routes/setting.route";
import schedule from "node-schedule";
import updateLocalAddress from "./routes/position.function";

mongoose.Promise = global.Promise;
mongoose
  .connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => {
      console.log("Database is connected");
    },
    (err) => {
      console.log("Can not connect to the database" + err);
    }
  );

//run update localPosition
const job = schedule.scheduleJob("/60 * * * * *", function () {
  console.log("Calling updateLocalAddress");
  updateLocalAddress();
});

const app = express();
const port = process.env.PORT || 4500;

app.use(bodyParser.json());
app.use(cors({}));
app.use("/business", businessRoute);
app.use("/health-change", healthChangeRoute);
app.use("/position-map", positionMapRoute);
app.use("/profile", profileRoute);
app.use("/setting", settingRoute);
app.use("/org", orgRoute);
app.use("/message", messageRoute);
app.use("/invite", inviteRoute);

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});
