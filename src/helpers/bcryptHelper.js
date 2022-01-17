import bcrypt from "bcryptjs";

export const hashPass = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export const comparePass = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};
