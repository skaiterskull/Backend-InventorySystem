import catSchema from "./catSchema.js";

// Create Category
export const createCat = (obj) => {
  return catSchema(obj).save();
};

//Fetch category and sort in ascending by slug
export const fetchCat = () => {
  return catSchema.find().sort({ slug: 1, _id: 1 });
};

export const getSingleCat = (obj) => {
  console.log("this is hit", obj);
  return catSchema.findOne(obj);
};

//delete category
export const deleteCat = (_id) => {
  return catSchema.findByIdAndDelete(_id);
};
