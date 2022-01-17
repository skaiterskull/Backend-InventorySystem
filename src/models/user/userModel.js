import userSchema from "./userSchema.js";

//Fecth User
export const fetchUser = () => {
  return userSchema.find();
};

// Create User
export const createUser = (obj) => {
  return userSchema(obj).save();
};
