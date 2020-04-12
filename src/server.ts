import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import config from "./config/db";
import businessRoute from "./routes/business.route";

// const app = express();
const port = process.env.PORT || 4500;
// app.get("/", (req, res) => {
//   res.send("The sedulous hyena ate the antelope!");
// });

mongoose.Promise = global.Promise;
mongoose
  .connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => {
      console.log("Database is connected");
    },
    (err) => {
      console.log("Can not connect to the database" + err);
    },
  );

const app = express();
app.use(bodyParser.json());
app.use(cors({}));
app.use("/business", businessRoute);

app.listen((port: number) => {
  return console.log(`server is listening on ${port}`);
});
