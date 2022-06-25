export const sortArrayAcs = (array) => {
  const sortedResult = array.sort((a, b) => {
    let fa = a.title.toLowerCase(),
      fb = b.title.toLowerCase();

    if (fa < fb) {
      return -1;
    }

    if (fa > fb) {
      return 1;
    }

    return 0;
  });

  return sortedResult;
};
