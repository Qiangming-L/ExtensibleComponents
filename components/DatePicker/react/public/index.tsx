import { timestamp } from "../../../../mixins/timestamp";

export type DefaultDate = Date | string | number | Segment | undefined;

export type Segment = {
  start?: Date | string;
  end?: Date | string;
};

export type PopupPlate = "year" | "month" | "date";

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
  }
  return isSelecteDate;
};

export const disableDateFun = (
  data: string | Date,
  disableDateParameter: DefaultDate,
  moduleName: PopupPlate,
  isChoice: boolean = false
): boolean => {
  let isDisableDate = false;
  const type = Object.prototype.toString.call(disableDateParameter);
  let _data = getTimeFun(`${data}`);
  if (type === "[object String]" || type === "[object Number]") {
    isDisableDate = _data === getTimeFun(`${disableDateParameter}`);
  } else if (type === "[object Object]") {
    const _disableDateParameter = disableDateParameter as Segment;
    const { start, end } = _disableDateParameter;
    if (start && end) {
      if (getTimeFun(`${start}`) > getTimeFun(`${end}`)) return isDisableDate;
      const _startyear = timestamp(start, "YYYY");
      const _startmonth = timestamp(start, "MM");
      const _startDate = timestamp(start, "DD");
      const _endyear = timestamp(end, "YYYY");
      const _endmonth = timestamp(end, "MM");
      const _endDate = timestamp(end, "DD");
      isDisableDate =
        getTimeFun(`${start}`) <= _data && getTimeFun(`${end}`) > _data;
      if (moduleName === "year") {
        _data = getTimeFun(`${timestamp(_data, "YYYY")}-12-31`, "23:59:59");
        isDisableDate =
          getTimeFun(`${_startyear}-${_startmonth}-${_startDate}`) <= _data &&
          getTimeFun(`${_endyear}-${_endmonth}-${_endDate}`, "23:59:59") >=
            _data;
      } else if (moduleName === "month") {
        const _dates = new Date(
          timestamp(_data, "YYYY"),
          timestamp(_data, "MM"),
          0
        ).getDate();
        _data = getTimeFun(
          `${timestamp(_data, "YYYY")}-${timestamp(_data, "MM")}-${_dates}`,
          "23:59:59"
        );
        isDisableDate =
          getTimeFun(`${_startyear}-${_startmonth}-${_startDate}`) <= _data &&
          getTimeFun(`${_endyear}-${_endmonth}-${_endDate}`, "23:59:59") >=
            _data;
      }
    } else if (end) {
      isDisableDate = getTimeFun(`${end}`) > _data;
      if (isChoice) {
        const _year = timestamp(end, "YYYY");
        const _month = timestamp(end, "MM");
        if (moduleName === "year") {
          isDisableDate = getTimeFun(`${_year}`) - 1000 > _data;
        } else if (moduleName === "month") {
          isDisableDate = getTimeFun(`${_year}-${_month}`) - 1000 > _data;
        }
      }
    } else if (start) {
      isDisableDate = getTimeFun(`${start}`) <= _data;
    }
  }
  return isDisableDate;
};
