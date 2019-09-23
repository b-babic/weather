function containsObject(obj, list) {
  list.map(city => {
    if (city.id === obj.id) return true;
  });

  return false;
}

export default containsObject;
