const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Announcement = mongoose.model("Announcement", announcementSchema);

module.exports = Announcement;
