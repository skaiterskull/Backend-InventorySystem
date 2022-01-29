import jwt from "jsonwebtoken";

export const createJwt = async ({ email }) => {
  const token = jwt.sign({ email }, process.env.SECRET_JWT, {
    expiresIn: "1d",
  });
  return token;
};

export const verifyJwt = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_JWT);
  } catch (error) {
    return error.message;
  }
};
