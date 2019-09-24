const uuid = () => {
  //NOTE: should be ok for less than 10k records.Collision might occur later;
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

export default uuid;
