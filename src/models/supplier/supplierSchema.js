import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 80,
    },
    slug: {
      type: String,
      required: true,
      maxLength: 50,
      indexes: 1,
      unique: true,
    },
    address: {
      type: String,
      required: true,
      maxLength: 200,
    },
    phone: {
      type: String,
      default: "",
      maxLength: 15,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Supplier", supplierSchema);
