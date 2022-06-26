import catSchema from "./catSchema.js";

// Create Category
export const createCat = (obj) => {
  return catSchema(obj).save();
};

// //Fetch category
export const fetchCat = () => {
  return catSchema.find();
};

export const getSingleCat = (obj) => {
  console.log("this is hit", obj);
  return catSchema.findOne(obj);
};

// //delete category
// export const deleteCat = (_id) => {
//   return catSchema.findByIdAndDelete(_id);
// };
