export const copyDeep = (entity) => {
  const isOther = (entity) => typeof entity !== 'object';
  const isArray = Array.isArray(entity);
  const isObject = !isOther(entity) && !Array.isArray(entity);

  if (isArray) {
    const arrCopy = entity.map((item) => {
      if (isOther(item)) {
        return item;
      }

      return copyDeep(item);
    });

    return arrCopy;
  } else if (isObject) {
    const objCopy = {};

    for (const key in entity) {
      if (isOther(entity[key])) {
        objCopy[key] = entity[key];
      } else {
        objCopy[key] = copyDeep(entity[key]);
      }
    }

    return objCopy;
  } else {
    return entity;
  }
};
