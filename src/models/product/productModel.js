import productSchema from "./productSchema.js";

// Create product
export const createProduct = (obj) => {
  return productSchema(obj).save();
};

// Find product by filter
export const findProduct = (filter) => {
  const field = Object.keys(filter);
  return productSchema.find({ [field]: { $regex: filter.name } });
};

//Update supplier
export const updateProduct = (id, toUpdate) => {
  return productSchema.findByIdAndUpdate(id, toUpdate, { new: true });
};
