
export const searchBack = (value, searchText, startIndex, instanceCount, maxDistance) => {
  let i = startIndex;
  let instances = 0;
  let v = value;
  while (i > 0 && startIndex - i < maxDistance && instances < instanceCount) {
    v = v.slice(0, i);
    i = v.lastIndexOf(searchText);
    instances++;
  }
  return i <= 0 ? 0 : i + searchText.length;
};

export const searchForward = (value, searchText, startIndex, instanceCount, maxDistance) => {
  let i = startIndex;
  let instances = 0;
  let v = value.slice(i);
  while (v.indexOf(searchText >= 0) && i < value.length - 1 && i - startIndex < maxDistance && instances < instanceCount) {
    const nextSlice = v.indexOf(searchText) + searchText.length;
    v = v.slice(nextSlice);
    i += nextSlice;
    instances++;
  }
  if (i - startIndex > maxDistance) {
    return startIndex + maxDistance;
  }

  return i;
};

export const getExcerpt = (value, min, max) => {
  let newMin = searchBack(value, '. ', min, 1, 50);
  if (newMin < 0 || newMin === min) {
    newMin = searchBack(value, ' ', min, 10, 50);
  }

  let newMax = searchForward(value, '. ', max, 1, 50);
  if (newMax === (max + 50) || newMax === max) {
    newMax = searchForward(value, ' ', max, 10, 50);
  }

  const excerpt = value.slice(newMin, newMax);

  return {
    excerpt,
    min: newMin,
    max: newMax,
  };
};

