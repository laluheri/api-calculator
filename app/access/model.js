const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let accessSchema = Schema(
  {
    login_time: {
      type: Date,
      require: true,
    },
    logout_time: {
      type: Date,
      require: true,
    },
    total_time: {
      type: Number,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = model("Access", accessSchema);
