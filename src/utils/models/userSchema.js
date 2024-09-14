import mongoose, { Schema } from "mongoose";

const user = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    imgLink: String,
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.users || mongoose.model("users", user);

export default User;
