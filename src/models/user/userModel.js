import userSchema from "./userSchema.js";

//Fetch User
export const fetchUser = () => {
  return userSchema.find();
};

// Create user
export const createUser = (obj) => {
  return userSchema(obj).save();
};

//update user status and roles and jwt
export const updateUserRoleAndStatus = (filter, toUpdate) => {
  return userSchema.findOneAndUpdate(filter, toUpdate, { new: true });
};

//delete user
export const deleteUser = (_id) => {
  return userSchema.findByIdAndDelete(_id);
};

//find user by email
export const getUser = (email) => {
  return userSchema.findOne({ email });
};
