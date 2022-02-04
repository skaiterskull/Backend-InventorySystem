import Joi from "joi";

const name = Joi.string().max(80).required();
const address = Joi.string().max(200);
const phone = Joi.string().max(15);

export const newSupplierValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      name,
      address,
      phone,
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
