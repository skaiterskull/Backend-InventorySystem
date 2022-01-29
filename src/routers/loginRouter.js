import express from "express";
import { comparePass } from "../helpers/bcryptHelper.js";
import { createJwt } from "../helpers/jwtHelper.js";
import { loginValidation } from "../middlewares/userValidation.js";
import { getUser, updateUserRoleAndStatus } from "../models/user/userModel.js";

const Router = express.Router();

// user Login
Router.post("/", loginValidation, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await getUser(email);
    if (result?._id) {
      const passMatched = comparePass(password, result.password);
      if (passMatched && result.role === "admin") {
        //create jwt
        const jwtToken = await createJwt({ _id: result._id, email });
        //update in the database
        const isUpdated = await updateUserRoleAndStatus(
          { _id: result._id },
          { jwtToken }
        );
        if (isUpdated?._id) {
          isUpdated.password = undefined;
          return res.json({
            status: "success",
            message: "Login successful",
            result: isUpdated,
          });
        }
      }
    }

    res.json({
      status: "error",
      message: "Invalid login details",
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
