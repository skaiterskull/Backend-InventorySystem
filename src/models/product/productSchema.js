import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
      maxLength: 20,
      minlength: 6,
      indexes: 1,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      minlength: 2,
      maxLength: 50,
    },
    stockCount: {
      type: Number,
      max: 9999,
    },
    description: {
      type: String,
      minlength: 1,
      maxlength: 300,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },
    buyPrice: {
      type: Number,
      required: true,
      max: 50000000,
    },
    sellPrice: {
      type: Number,
      required: true,
      max: 60000000,
    },
    createdBy: {
      type: String,
      required: true,
      ref: "userId",
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
