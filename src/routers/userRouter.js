import express from "express";
import { fetchUser, createUser } from "../models/user/userModel.js";
import { hashPass } from "../helpers/bcryptHelper.js";
import { newUserValidation } from "../middlewares/userValidation.js";

const Router = express.Router();

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

export default Router;
