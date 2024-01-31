const mongoose = require("mongoose");

const DataModel = mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("data", DataModel);
