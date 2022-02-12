import express from "express";
import { newProductValidation } from "../middlewares/productValidation.js";
import { createProduct, findProduct } from "../models/product/productModel.js";

const Router = express.Router();

// add new product
Router.post("/", newProductValidation, async (req, res, next) => {
  try {
    const product = await createProduct(req.body);

    product._id
      ? res.json({
          status: "success",
          message: "Product has been created.",
        })
      : res.json({
          status: "error",
          message: "Unable to create product, please contact administrator.",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.status = 200;
      error.message = "PLU already exist";
    }
    next(error);
  }
});

// find product by filter
Router.post("/find-product", async (req, res, next) => {
  try {
    const product = await findProduct(req.body);

    product.length
      ? res.json({
          status: "success",
          message: "Product/s found.",
          result: product,
        })
      : res.json({
          status: "error",
          message: "Product not found, please contact administrator.",
        });
  } catch (error) {
    next(error);
  }
});

export default Router;
