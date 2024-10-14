const mongoose = require("mongoose")
const dataModel = require("./models/data_schema")

let url = 'mongodb://127.0.0.1:27017/personal_budget';

const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use("/", express.static("public"));

app.use(cors());

app.get("/budget", (req, res) => {
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to the database");
      dataModel
        .find({})
        .then((data) => {
          res.json(data);
          console.log(data);
          mongoose.connection.close();
        })
        .catch((connectionError) => {
          console.log(connectionError);
        });
    });
});

app.post("/budget", (req, res) => {
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to the database");
      const newItem = new dataModel(req.body);
      dataModel
        .create(newItem)
        .then((data) => {
          res.json(data);
          console.log(data);
          mongoose.connection.close();
        })
        .catch((connectionError) => {
          console.log(connectionError);
        });
    });
});
app.listen(port, () => {
  console.log(`API served at http://localhost:${port}`);
});