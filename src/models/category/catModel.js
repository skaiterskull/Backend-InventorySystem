import catSchema from "./catSchema.js";

//Fetch category
export const fetchCat = () => {
  return catSchema.find();
};

// Create Category
export const createCat = (obj) => {
  return catSchema(obj).save();
};

//delete category
export const deleteCat = (_id) => {
  return catSchema.findByIdAndDelete(_id);
};
