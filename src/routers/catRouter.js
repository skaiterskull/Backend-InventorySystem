import express from "express";
import { createSlug } from "../helpers/slugifyHelper.js";
import { newCatValidation } from "../middlewares/catValidation.js";
import { createCat, deleteCat, fetchCat } from "../models/category/catModel.js";
const Router = express.Router();

//fetch all category
Router.get("/", async (req, res, next) => {
  try {
    const result = await fetchCat();

    if (result.length) {
      return res.json({
        status: "success",
        result,
      });
    }

    res.json({ status: "error", message: "category not found" });
  } catch (error) {
    if (error) {
      error.status = 500;
      error.message = "Internal server error";
    }
    next(error);
  }
});

// add new category
Router.post("/", newCatValidation, async (req, res, next) => {
  try {
    const { name } = req.body;
    const slug = createSlug(name);

    const category = await createCat({
      name,
      slug,
    });

    category._id
      ? res.json({
          status: "success",
          message: "Category has been created.",
        })
      : res.json({
          status: "error",
          message: "Unable to create category, please contact administrator.",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.status = 200;
      error.message = "Category already exist";
    }
    next(error);
  }
});

//Delete user
Router.delete("/", async (req, res, next) => {
  try {
    const { _id } = req.body;
    const result = await deleteCat(_id);
    if (result?._id) {
      return res.json({
        status: "success",
        message: "Category has been deleted!",
      });
    }
    res.json({
      status: "error",
      message: "Unable to delete the category, please contact administrator!",
    });
  } catch (error) {
    if (error) {
      error.status = 500;
      error.message = "Internal server error";
    }
    next(error);
  }
});

export default Router;
