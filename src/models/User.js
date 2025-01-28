const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, required: true },
    role: { type: String, required: true, enum: ["teacher", "student"] },
    major: { type: String, required: true },
    bio: String,
    socialLinks: {
      linkedin: String,
      twitter: String,
    },
    grades: [
      {
        taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
        grade: Number,
      },
    ],
    overallGrade: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
