const mongoose = require("mongoose")

const assignmentSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    url: { type: String, required: true },
    status: {
      type: String,
      default: "submitted",
      enum: ["submitted", "graded", "rejected"],
    },
    feedback: String,
  },
  { timestamps: true }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;
