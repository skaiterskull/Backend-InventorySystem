import catSchema from "./catSchema.js";

// Create Category
export const createCat = (obj) => {
  return catSchema(obj).save();
};

//Fetch category and sort in ascending by slug
export const fetchCat = () => {
  return catSchema.find().sort({ slug: 1, _id: 1 });
};

//get single category
export const getSingleCat = (obj) => {
  return catSchema.findOne(obj);
};

//update category
export const updateCat = (obj) => {
  return catSchema.findByIdAndUpdate(
    obj._id,
    {
      slug: obj.slug,
      title: obj.title,
      description: obj.description,
    },
    { new: true }
  );
};

//delete category
export const deleteCat = (_id) => {
  return catSchema.findByIdAndDelete(_id);
};
