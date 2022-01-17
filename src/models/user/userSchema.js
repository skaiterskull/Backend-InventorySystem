import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 50,
    },
    userName: {
      type: String,
      required: true,
      maxLength: 50,
      minlength: 8,
      indexes: 1,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      maxLength: 100,
      minLength: 8,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
