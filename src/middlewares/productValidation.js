import Joi from "joi";

const plu = Joi.string().max(8).required();
const name = Joi.string().max(50).required();
const buyPrice = Joi.number().max(50000000).required();
const sellPrice = Joi.number().max(50000000).required();
const supplier = Joi.array().min(1);
const category = Joi.array().min(1);

export const newProductValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      plu,
      name,
      buyPrice,
      sellPrice,
      supplier,
      category,
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
