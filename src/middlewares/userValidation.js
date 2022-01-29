import Joi from "joi";

const name = Joi.string().max(50).required();
const email = Joi.string().email({ minDomainSegments: 2 });
const password = Joi.string().max(100).min(8).required();

export const newUserValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      name,
      email,
      password,
    });

    const { error } = schema.validate(req.body);

    if (error) {
      error.status = 200;
      return next(error);
    }

    return next();
  } catch (error) {
    next(error);
  }
};

export const loginValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      email,
      password,
    });

    const { error } = schema.validate(req.body);

    if (error) {
      if (error.message.includes("email")) {
        error.message = "Invalid email!";
      }
      if (error.message.includes("password")) {
        error.message = "Password can not be empty or less than 8 characters!";
      }
      error.status = 200;
      return next(error);
    }

    return next();
  } catch (error) {
    next(error);
  }
};
