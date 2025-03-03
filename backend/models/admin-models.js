const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
const adminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    jobTitle: {
      type: String,
      required: true,
    },

    salary: {
      type: Number,
    },

    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
