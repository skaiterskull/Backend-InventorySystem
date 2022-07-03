import express from "express";
import { createSlug } from "../helpers/slugifyHelper.js";
import { newCatValidation } from "../middlewares/catValidation.js";
import {
  createCat,
  fetchCat,
  getSingleCat,
  deleteCat,
} from "../models/category/catModel.js";

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

//fetch single category
Router.get("/:slug", async (req, res, next) => {
  try {
    const { slug } = req.params;
    const result = await getSingleCat({ slug: slug });

    if (result?._id) {
      return res.json({
        status: "success",
        result,
      });
    }

    return res.json({ status: "error", message: "category not found" });
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
    const { title, description } = req.body;
    const slug = createSlug(title);

    const category = await createCat({
      title,
      slug,
      description,
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

// Delete category
Router.delete("/", async (req, res, next) => {
  try {
    console.log(req.body);
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
