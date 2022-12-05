const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/profile", async (req, res) => {
  try {
    const client = await MongoClient.connect(
      "mongodb://admin:admin@localhost:27017"
    );
    var db = client.db("user");
    var query = { userId: 1 };
    const dbRes = await db.collection("userAccount").findOne(query);
    client.close();
    res.send(dbRes);
  } catch (error) {
    throw error;
  }
});
app.post("/update-profile", async (req, res) => {
  const userObj = req.body;
  var response = res;
  console.log("Connecting to db....");
  try {
    const client = await MongoClient.connect(
      "mongodb://admin:admin@localhost:27017"
    );
    var db = client.db("user");
    userObj["userId"] = 1;
    const newValues = { $set: userObj };
    var query = { userId: 1 };
    const dbRes = await db
      .collection("userAccount")
      .updateOne(query, newValues, { upsert: true });
    client.close();
    response.send(dbRes);
  } catch (error) {
    throw error;
  }
});

app.listen(3000, () => {
  console.log("App started on port 3000");
});
