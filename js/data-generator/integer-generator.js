function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function getRandomUniqueInteger(min, max) {
  const valuesList = [];

  return function () {
    let currentValue = getRandomInteger(min, max);

    while (valuesList.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }

    valuesList.push(currentValue);

    return currentValue;
  };
}

function createIdGenerator() {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;

    return lastGeneratedId;
  };
}

export { getRandomInteger, getRandomUniqueInteger, createIdGenerator };
