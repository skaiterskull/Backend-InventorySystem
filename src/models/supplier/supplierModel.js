import supplierSchema from "./supplierSchema.js";

//Fetch supplier
export const fetchSupplier = () => {
  return supplierSchema.find();
};

// Create supplier
export const createSupplier = (obj) => {
  return supplierSchema(obj).save();
};
