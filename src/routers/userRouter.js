import express from "express";
import {
  fetchUser,
  createUser,
  updateUserRoleAndStatus,
  deleteUser,
} from "../models/user/userModel.js";
import { hashPass } from "../helpers/bcryptHelper.js";
import { newUserValidation } from "../middlewares/userValidation.js";

const Router = express.Router();

//fetch all user
Router.get("/", async (req, res, next) => {
  try {
    const result = await fetchUser();

    if (result.length) {
      result.map((value) => {
        value.password = undefined;
      });
      return res.json({
        status: "success",
        result,
      });
    }

    res.json({ status: "error", message: "user not found" });
  } catch (error) {
    if (error) {
      error.status = 500;
      error.message = "Internal server error";
    }
    next(error);
  }
});

// add new user
Router.post("/", newUserValidation, async (req, res, next) => {
  try {
    const { password } = req.body;
    req.body.password = hashPass(password);

    const user = await createUser(req.body);

    user._id
      ? res.json({
          status: "success",
          message: "User has been created.",
        })
      : res.json({
          status: "error",
          message: "Unable to create account, please contact administrator.",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.status = 200;
      error.message = "Email already exist";
    }
    next(error);
  }
});

//Update user role and status
Router.patch("/", async (req, res, next) => {
  try {
    const { email, ...toUpdate } = req.body;
    const result = await updateUserRoleAndStatus({ email }, toUpdate);
    if (result?._id) {
      return res.json({
        status: "success",
        message: "User account has been updated!",
      });
    }
    res.json({
      status: "error",
      message: "Unable to update the account, please contact administrator!",
    });
  } catch (error) {
    if (error) {
      error.status = 500;
      error.message = "Internal server error";
    }
    next(error);
  }
});

//Delete user
Router.delete("/", async (req, res, next) => {
  try {
    const { _id } = req.body;
    const result = await deleteUser(_id);
    if (result?._id) {
      return res.json({
        status: "success",
        message: "User account has been deleted!",
      });
    }
    res.json({
      status: "error",
      message: "Unable to delete the account, please contact administrator!",
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
