/**
 * @todo Delete duplicate data from array,No deep traversal
 * @param {Array} dataArray
 * @returns {Array}
 */
export const removeDuplicate: Function = (
  dataArray: Array<any> = []
): Array<any> => {
  if (Object.prototype.toString.call(dataArray) !== "[object Array]") {
    throw new Error("removeDuplicate`s parameter must be an Array");
  }
  if (dataArray.length > 1) {
    let provisionalityArray: Array<any> = [dataArray[0]];
    const Length = dataArray.length;
    for (let i = 0; i < Length; i++) {
      // let haveData: boolean = false;
      // for (let j = 0; j < provisionalityArray.length; j++) {
      //   if (dataArray[i] === provisionalityArray[j]) {
      //     haveData = false;
      //     break;
      //   } else {
      //     // Determine the null
      //     if (
      //       typeof dataArray[i] === "number" &&
      //       typeof provisionalityArray[j] === "number" &&
      //       dataArray[i].toString() === "NaN" &&
      //       dataArray[i].toString() === provisionalityArray[j].toString()
      //     ) {
      //       haveData = false;
      //       break;
      //     }
      //     haveData = true;
      //   }
      // }
      // if (haveData) {
      //   provisionalityArray.push(dataArray[i]);
      // }
      if (!provisionalityArray.includes(dataArray[i])) {
        provisionalityArray.push(dataArray[i]);
      }
    }
    return provisionalityArray;
  }
  return dataArray;
};

/**
 * @todo Flattening an array
 * @param {Array} dataArray
 * @returns {Array}
 */
export const flatteningArray: Function = (
  dataArray: Array<any>
): Array<any> => {
  if (Object.prototype.toString.call(dataArray) !== "[object Array]") {
    throw new Error("removeDuplicate`s parameter must be an Array");
  }
  let provisionalityArray: Array<any> = [];
  const Length = dataArray.length;
  for (let i = 0; i < Length; i++) {
    if (Object.prototype.toString.call(dataArray[i]) === "[object Array]") {
      provisionalityArray = [
        ...provisionalityArray,
        ...flatteningArray(dataArray[i]),
      ];
    } else {
      provisionalityArray.push(dataArray[i]);
    }
  }
  return provisionalityArray;
};
/**
 * @todo Check whether two arrays are the same
 * @param {Array} arrayOne
 * @param {Array} arrayTwo
 * @param {Boolean} [deepness=false] whether to enable depth traversal
 * @returns {Boolean}
 */
export const equalArray: Function = (
  arrayOne: Array<any> = [],
  arrayTwo: Array<any> = [],
  deepness: boolean = false
): boolean => {
  if (
    Object.prototype.toString.call(arrayOne) !== "[object Array]" ||
    Object.prototype.toString.call(arrayTwo) !== "[object Array]"
  ) {
    throw new Error("equalArray`s parameter must be Array");
  }
  let isEqual: boolean = false;
  if (arrayOne.length !== arrayTwo.length) {
    return isEqual;
  }
  if (arrayOne.length > 0 && arrayOne.length === arrayTwo.length) {
    const Length = arrayOne.length;
    for (let i = 0; i < Length; i++) {
      if (
        deepness &&
        Object.prototype.toString.call(arrayOne[i]) === "[object Array]"
      ) {
        isEqual = equalArray(arrayOne[i], arrayTwo[i]);
        if (!isEqual) {
          break;
        }
      } else if (
        deepness &&
        Object.prototype.toString.call(arrayOne[i]) === "[object Object]"
      ) {
        isEqual = equalObject(arrayOne[i], arrayTwo[i]);
        if (!isEqual) {
          break;
        }
      } else {
        if (arrayOne[i] !== arrayTwo[i]) {
          if (
            typeof arrayOne[i] === "number" &&
            typeof arrayTwo[i] === "number" &&
            arrayOne[i].toString() === "NaN" &&
            arrayOne[i].toString() === arrayTwo[i].toString()
          ) {
            isEqual = true;
          } else {
            isEqual = false;
            break;
          }
        } else {
          isEqual = true;
        }
      }
    }
  }
  return isEqual;
};

/**
 * @todo Check whether two objects are equal
 * @param {Object} ObjOne
 * @param {Object} objTwo
 * @param {Boolean} [deepness=false] whether to enable depth traversal
 * @returns {Boolean}
 */
export const equalObject: Function = (
  ObjOne: any,
  objTwo: any,
  deepness: boolean = false
): boolean => {
  if (
    Object.prototype.toString.call(ObjOne) !== "[object Object]" ||
    Object.prototype.toString.call(objTwo) !== "[object Object]"
  ) {
    throw new Error("equalObject`s parameter must be Object");
  }
  let isEqual = false;
  if (JSON.stringify(ObjOne) === "{}" || JSON.stringify(objTwo) === "{}") {
    throw new Error("The parameter has an empty Object");
  }
  if (ObjOne === objTwo) {
    isEqual = true;
    return isEqual;
  }
  if (
    Object.getOwnPropertyNames(ObjOne).length !==
    Object.getOwnPropertyNames(objTwo).length
  ) {
    return isEqual;
  }
  for (let key in ObjOne) {
    if (
      deepness &&
      Object.prototype.toString.call(ObjOne[key]) === "[object Array]"
    ) {
      isEqual = equalArray(ObjOne[key], objTwo[key]);
      if (!isEqual) {
        break;
      }
    } else if (
      deepness &&
      Object.prototype.toString.call(ObjOne[key]) === "[object Object]"
    ) {
      isEqual = equalObject(ObjOne[key], objTwo[key]);
      if (!isEqual) {
        break;
      }
    } else {
      if (ObjOne[key] !== objTwo[key]) {
        if (
          typeof ObjOne[key] === "number" &&
          typeof objTwo[key] === "number" &&
          ObjOne[key].toString() === "NaN" &&
          ObjOne[key].toString() === objTwo[key].toString()
        ) {
          isEqual = true;
        } else {
          isEqual = false;
          break;
        }
      } else {
        isEqual = true;
      }
    }
  }
  return isEqual;
};
