const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let accessSchema = Schema(
  {
    access_name: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = model("Access", accessSchema);
