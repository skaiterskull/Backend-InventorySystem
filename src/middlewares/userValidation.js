import Joi from "joi";

const name = Joi.string().max(50).required();
const userName = Joi.string().max(30).min(8).required();
const password = Joi.string().max(100).min(8).required();

export const newUserValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      name,
      userName,
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
