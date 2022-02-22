/**
 * * @param callBack Function => Function executed after the timer is complete
 * * @param time Number
 * * @param condition Boolean => Whether callback needs to be executed
 */

let timer: any = null;

export const throttling: Function = (
  callBack: Function = () => {},
  time: number = 1000,
  condition: boolean = true
): void => {
  if (Object.prototype.toString.call(callBack) !== "[object Function]") {
    throw new Error("The first argument to throttling must be Function");
  }
  if (Object.prototype.toString.call(condition) !== "[object Boolean]") {
    throw new Error("The second argument to throttling must be Boolean");
  }
  if (Object.prototype.toString.call(time) !== "[object Number]") {
    throw new Error("The third argument to throttling must be Number");
  }
  if (timer) {
    return;
  }
  timer = setTimeout(() => {
    if (condition && callBack) {
      callBack();
    }
    clearTimeout(timer);
    timer = null;
  }, time);
};
