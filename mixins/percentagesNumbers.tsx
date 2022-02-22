/**
 *
 * convert percentages to decimals
 * @param data (number | string) => percentage
 * @returns Number
 *
 */
export const percentagesNumbers: Function = (
  data: number | string
): number | Error => {
  const typeOfData = typeof data;
  let provisionality: number | string = data;
  if (typeOfData !== "string" && typeOfData !== "number") {
    throw new Error("data can only be a percentage or a number");
  }
  // Number.isNaN(value) => (typeof value) === 'number' && window.isNaN(value)
  if (typeOfData === "string") {
    const stringData = provisionality.toString();
    if (stringData.indexOf("%") > -1) {
      if (Number.isNaN(parseInt(stringData))) {
        throw new Error("data can only be a percentage or a number");
      } else {
        provisionality = parseInt(stringData) / 100;
      }
    } else if (Number.isNaN(Number(provisionality))) {
      throw new Error("data can only be a percentage or a number");
    }
  }
  return Number(provisionality);
};
