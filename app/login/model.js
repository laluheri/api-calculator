const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let userSchema = Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
