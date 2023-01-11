const mongoose = require("mongoose");
const { dbHost, dbPort, dbName } = require("../app/config");

const uri = `mongodb://${dbHost}:${dbPort}/${dbName}`;

mongoose.set("strictQuery", true);

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("connection", () => {
  console.log("success connect to dabatase");
});

module.exports = db;
