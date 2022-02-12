import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    plu: {
      type: String,
      required: true,
      maxLength: 8,
      indexes: 1,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      maxLength: 50,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    buyPrice: {
      type: Number,
      required: true,
      max: 50000000,
    },
    sellPrice: {
      type: Number,
      required: true,
      max: 50000000,
    },
    supplier: {
      type: Array,
      required: true,
      ref: "supplierId",
    },
    category: {
      type: Array,
      required: true,
      ref: "categoryId",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
