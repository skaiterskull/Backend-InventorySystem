import mongoose from "mongoose";

const catSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 50,
    },
    slug: {
      type: String,
      required: true,
      maxLength: 50,
      indexes: 1,
      unique: true,
    },
    createdBy: {
      type: String,
      required: true,
      default: "Hendra",
      maxLength: 30,
      ref: "userID",
    },
    description: {
      type: String,
      required: true,
      maxLength: 300,
      minlength: 1,
      default: "-",
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    noOfProduct: {
      type: Number,
      required: true,
      default: 0,
      max: 9999,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", catSchema);
