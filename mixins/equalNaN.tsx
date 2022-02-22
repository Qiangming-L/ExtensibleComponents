/**
 * Checks whether two numbers are NaN, and returns true if so
 * @param dataOne number => NaN
 * @param dataTwo number => NaN
 * @returns boobe
 */
export const equalNaN: Function = (dataOne?: any, dataTwo?: any): boolean => {
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
