const mongoose = require("mongoose");
const User = require("../models/user.model");
const Token = require("../models/token.model");

var db = null;
class database {
  constructor() {
    const { MONGO_URI } = process.env;
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }
    if (db) {
      return db;
    }
    this._connect();
    return db;
  }

  _connect() {
    mongoose.set("strictQuery", true);
    mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.error("Database connection error");
      });

    db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));

    db.once("open", function () {
      console.log("We're connected!");
      db.User = User;
      db.Token = Token;
    });

    db.on("disconnected", function () {
      console.log("Mongoose default connection is disconnected");
    });
  }
}

module.exports = new database();