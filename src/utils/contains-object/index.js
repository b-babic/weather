function containsObject(array, attr, obj) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].hasOwnProperty(attr) && array[i][attr] === obj[attr]) {
      return i;
    }
  }
  return -1;
}

export default containsObject;
