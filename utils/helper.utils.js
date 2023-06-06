const utils = {};
utils.generateRandomNumber = (max) => {
  try {
    return Math.floor(Math.random() * 100000000 + max);
  } catch (error) {
    return console.log("error for generateRandomNumber", error);
  }
};
module.exports = utils;
