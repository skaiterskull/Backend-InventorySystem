import userSchema from "./userSchema.js";

//Fecth User
export const fetchUser = () => {
  return userSchema.find();
};

// Create User
export const createUser = (obj) => {
  return userSchema(obj).save();
};

//update user status and roles
export const updateUserRoleAndStatus = (filter, toUpdate) => {
  return userSchema.findOneAndUpdate(filter, toUpdate, { new: true });
};
