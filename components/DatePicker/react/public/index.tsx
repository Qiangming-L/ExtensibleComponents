export type DefaultDate =
  | Date
  | string
  | number
  | Array<Date | string | number>
  | Segment
  | undefined;

export type Segment = {
  start?: Date | string;
  end?: Date | string;
};

export type Data = {
  text: string | number;
  fullData: string;
  which?: string;
  isDisableDate: boolean;
  isSelecteDate: boolean;
  isFalseChoice: boolean;
};

const getTimeFun = (
  date: Date | string,
  _time: string = "00:00:00"
): number => {
  const _data = new Date(`${date} ${_time}`).getTime();
  return _data;
};

export const selecteDateFun = (
  data: string | Date,
  selectedDate: DefaultDate
): boolean => {
  if (!selectedDate) return false;
  let isSelecteDate = false;
  const type = Object.prototype.toString.call(selectedDate);
  const _data = getTimeFun(data);
  if (type === "[object Date]" || type === "[object String]") {
    isSelecteDate = getTimeFun(selectedDate as string) === _data;
  } else if (type === "[object Object]") {
    const _defaultDate = selectedDate as Segment;
    const { start, end } = _defaultDate;
    if (start && end) {
      if (getTimeFun(`${start}`) > getTimeFun(`${end}`)) return isSelecteDate;
      isSelecteDate =
        getTimeFun(`${start}`) <= _data && getTimeFun(`${end}`) >= _data;
    } else if (end) {
      isSelecteDate = getTimeFun(`${end}`) >= _data;
    } else if (start) {
      isSelecteDate = getTimeFun(`${start}`) <= _data;
    }
  } else if (type === "[object Array]") {
    const _defaultDate = selectedDate as Array<Date | string>;
    const _defaultDateFilter = _defaultDate.filter((item) => {
      return getTimeFun(item) === _data;
    });
    isSelecteDate = _defaultDateFilter.length > 0;
  }
  return isSelecteDate;
};

export const disableDateFun = (
  data: string | Date,
  disableDateParameter: DefaultDate
): boolean => {
  let isDisableDate = false;
  const type = Object.prototype.toString.call(disableDateParameter);
  const _data = getTimeFun(`${data}`);
  if (type === "[object String]" || type === "[object Number]") {
    isDisableDate = _data === getTimeFun(`${disableDateParameter}`);
  } else if (type === "[object Object]") {
    const _disableDateParameter = disableDateParameter as Segment;
    const { start, end } = _disableDateParameter;
    if (start && end) {
      if (getTimeFun(`${start}`) > getTimeFun(`${end}`)) return isDisableDate;
      isDisableDate =
        getTimeFun(`${start}`) <= _data && getTimeFun(`${end}`) > _data;
    } else if (end) {
      isDisableDate = getTimeFun(`${end}`) > _data;
    } else if (start) {
      isDisableDate = getTimeFun(`${start}`) <= _data;
    }
  } else if (type === "[object Array]") {
    const _disableDate = disableDateParameter as Array<Date | string>;
    const _disableDateFilter = _disableDate.filter((item) => {
      return getTimeFun(item) === _data;
    });
    isDisableDate = _disableDateFilter.length > 0;
  }
  return isDisableDate;
};
