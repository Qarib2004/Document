const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    topic: String,
    deadline: { type: Date, required: true },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Assignment" }],
    completionRate: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
