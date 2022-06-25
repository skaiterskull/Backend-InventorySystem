import catSchema from "./catSchema.js";

// Create Category
export const createCat = (obj) => {
  return catSchema(obj).save();
};

// //Fetch category
export const fetchCat = () => {
  return catSchema.find();
};

// //delete category
// export const deleteCat = (_id) => {
//   return catSchema.findByIdAndDelete(_id);
// };
