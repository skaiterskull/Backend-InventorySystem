import mongoose from "mongoose";

const catSchema = new mongoose.Schema(
  {
    name: {
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
  },
  { timestamps: true }
);

export default mongoose.model("Category", catSchema);
