import express from "express";
import { createSlug } from "../helpers/slugifyHelper.js";
import {
  createSupplier,
  deleteSupplier,
  fetchSupplier,
  updateSupplier,
} from "../models/supplier/supplierModel.js";
import { newSupplierValidation } from "../middlewares/supplierValidation.js";

const Router = express.Router();

//fetch all category
Router.get("/", async (req, res, next) => {
  try {
    const result = await fetchSupplier();

    if (result.length) {
      return res.json({
        status: "success",
        result,
      });
    }

    res.json({ status: "error", message: "supplier not found" });
  } catch (error) {
    if (error) {
      error.status = 500;
      error.message = "Internal server error";
    }
    next(error);
  }
});

// add new supplier
Router.post("/", newSupplierValidation, async (req, res, next) => {
  try {
    const { name } = req.body;
    const slug = createSlug(name);
    const supplier = await createSupplier({ ...req.body, slug });

    supplier?._id
      ? res.json({
          status: "success",
          message: "Supplier has been created.",
        })
      : res.json({
          status: "error",
          message: "Unable to create supplier, please contact administrator.",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.status = 200;
      error.message = "Supplier already exist";
    }
    next(error);
  }
});

//Update supplier
Router.put("/", async (req, res, next) => {
  try {
    const { _id, ...toUpdate } = req.body;
    toUpdate.slug = createSlug(toUpdate.name);
    const result = await updateSupplier(_id, toUpdate);
    if (result?._id) {
      return res.json({
        status: "success",
        message: "Supplier has been updated!",
        result,
      });
    }
    res.json({
      status: "error",
      message: "Unable to update the supplier, please contact administrator!",
    });
  } catch (error) {
    if (error.message.includes("E11000")) {
      error.status = 200;
      error.message = "Supplier already exist";
      return next(error);
    }
    if (error) {
      error.status = 500;
      error.message = "Internal server error";
    }
    next(error);
  }
});

Router.delete("/", async (req, res, next) => {
  try {
    const { _id } = req.body;
    const result = await deleteSupplier(_id);
    if (result?._id) {
      return res.json({
        status: "success",
        message: "Supplier has been deleted!",
      });
    }
    res.json({
      status: "error",
      message: "Unable to delete the supplier, please contact administrator!",
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
