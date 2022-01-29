import Joi from "joi";

const name = Joi.string().max(50).required();

export const newCatValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      name,
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
