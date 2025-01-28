const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "accepted", "rejected"],
    },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

const Invitation = mongoose.model("Invitation", invitationSchema);


module.exports = Invitation