const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["In Progress", "Completed", "On Hold"],
      default: "In Progress",
      required: true
    },
    assignedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
      }
    ],
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true
    },
    progress: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
