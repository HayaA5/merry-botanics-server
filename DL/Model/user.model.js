const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createdDate: {
    type: Date,
    default: new Date(),
  },
  lastConnectedDate: {
    type: Date,
    default: new Date(),
  },
  permission: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
