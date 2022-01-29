import slugify from "slugify";

export const createSlug = (data) => {
  const slugified = slugify(data, { replacement: "-", lower: true });
  return slugified;
};
