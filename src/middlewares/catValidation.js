import Joi from "joi";

const _id = Joi.string().required().max(100);
const title = Joi.string().max(50).required();
const description = Joi.string().max(300).min(1).required();

export const newCatValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      title,
      description,
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

export const updateCatValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      _id,
      title,
      description,
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
