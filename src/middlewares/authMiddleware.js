import { verifyJwt } from "../helpers/jwtHelper.js";

export const userAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (authorization) {
      const isJwtValid = verifyJwt(authorization);
      if (isJwtValid === "jwt expired") {
        return res.json({
          status: "error",
          message: "Session has expired, please log in!",
        });
      }
      if (isJwtValid?.email) {
        return next();
      }
    }

    return res.status(401).json({
      status: "error",
      message: "Unauthenticated. Please log in!",
    });
  } catch (error) {
    if (error) {
      error.status = 500;
      error.message = "Internal server error";
    }
    next(error);
  }
};
