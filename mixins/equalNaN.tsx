/**
 * @todo Checks whether two numbers are NaN, and returns true if so
 * @param {Number} dataOne
 * @param {Number} dataTwo
 * @returns {Boolean}
 */
export const equalNaN: Function = (dataOne: any, dataTwo: any): boolean => {
  let isEqual: boolean = false;
  if (
    typeof dataOne === "number" &&
    typeof dataTwo === "number" &&
    dataOne.toString() === "NaN" &&
    dataOne.toString() === dataTwo.toString()
  ) {
    isEqual = true;
  }
  return isEqual;
};
