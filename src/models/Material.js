const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        content: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Material = mongoose.model("Material", materialSchema);

module.exports = Material;
