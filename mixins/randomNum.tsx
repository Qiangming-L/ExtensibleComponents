export const GetRandomNum: Function = (min: number, max: number): number => {
  if (typeof min !== "number" || typeof max !== "number") {
    throw new Error("The values of min and Max can only be number");
  }
  const Range = max - min;
  const Rand = Math.random();
  return min + Math.round(Rand * Range);
};
