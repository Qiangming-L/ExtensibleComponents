import React, { useState, useEffect, useRef } from "react";

import "./index.css";

import { timestamp } from "../mixins/timestamp";
import { DefaultDate } from "./public";

import DatePopuop from "./date";
import YearMonth from "./yearMonth";
import DatePickerTitle from "./datePickerTitle";

import { Segment } from "./public";

type Props = {
  className?: string;
  classNamePopup?: string;
  placeholder?: string;
  selectionDate?: Date;
  popupPlate?: "year" | "month" | "date";
};

const DatePicker: React.FC<Props> = (props) => {
  const timer: any = useRef(null);
  const pickerInput: any = useRef(null);
  const {
    className = "",
    classNamePopup = "",
    placeholder = "请选择日期",
    selectionDate,
    popupPlate = "date",
  } = props;

  let defaultDate = "";
  let defaultYear = timestamp("YYYY");
  let defaultMonth = timestamp("MM");
  if (selectionDate) {
    defaultDate = timestamp(selectionDate, "YYYY-MM-DD");
    defaultYear = timestamp(selectionDate, "YYYY");
    defaultMonth = timestamp(selectionDate, "MM");
  }

  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showPopupPlate, setShowPopupPlate] = useState<string>(popupPlate);
  const [dateValue, setDateValue] = useState<string>(defaultDate);
  const [showYear, setShowYear] = useState<number>(Number(defaultYear));
  const [showMonth, setShowMonth] = useState<number>(Number(defaultMonth));
  const [animation, setAnimation] = useState<string>("");

  const onChange = (event: React.ChangeEvent<HTMLElement>) => {
    console.log(event);
  };

  const clearTimerFun = () => {
    clearTimeout(timer.current);
    timer.current = null;
  };

  useEffect(() => {
    setAnimation("unanimation");
    timer.current = setTimeout(() => {
      setShowPopup(false);
      clearTimerFun();
    }, 100);
  }, [dateValue]);

  const closePopup = (): void => {
    setAnimation("unanimation");
    timer.current = setTimeout(() => {
      setShowPopup(false);
      clearTimerFun();
    }, 100);
  };

  const onFocusBlur = (event: React.ChangeEvent<HTMLElement>) => {
    const { type } = event;
    if (type === "focus") {
      setShowPopup(true);
      timer.current = setTimeout(() => {
        setAnimation("animation");
        clearTimerFun();
      }, 50);
    } else if (type === "blur") {
      closePopup();
    }
  };

  const setDateValueFun = (data: DefaultDate): void => {
    const type = Object.prototype.toString.call(data);
    if (type === "[object Object]") {
      setDateValue(`${(data as Segment).start} ~ ${(data as Segment).end}`);
    } else if (type === "[object Array]") {
      let _data: string = "";
      const _dataArr = data as Array<Date | string | number>;
      const Length = _dataArr.length;
      for (let i = 0; i < Length; i++) {
        _data += `${_dataArr[i]};`;
      }
      setDateValue(_data);
    } else {
      setDateValue(`${data}`);
    }
  };

  const onClickDate = (data: DefaultDate) => {
    setDateValueFun(data);
  };
  const onClickMonthYear = (data: DefaultDate) => {
    setDateValueFun(data);
  };

  const changeDate = (
    data: any,
    event: React.MouseEvent<HTMLElement>
  ): void => {
    const target = event.target as HTMLElement;
    const _className = target.className;
    if (_className.includes("date-picker-year")) {
      setShowPopupPlate("year");
    } else if (_className.includes("date-picker-month")) {
      setShowPopupPlate("month");
    } else {
      setShowYear(data.year);
      setShowMonth(data.month);
    }
  };

  useEffect(() => {
    return () => {
      clearTimerFun();
    };
  }, []);

  return (
    <div className={`date-picker ${className}`}>
      <div className="date-picker-input">
        <input
          type="text"
          placeholder={placeholder}
          value={dateValue}
          onChange={onChange}
          onFocus={onFocusBlur}
          onBlur={onFocusBlur}
        />
      </div>
      {showPopup ? (
        <div className={`date-picker-popup ${animation} ${classNamePopup}`}>
          <DatePickerTitle onClick={changeDate} popupPlate={showPopupPlate} />
          {showPopupPlate === "year" ? (
            <YearMonth
              onClick={onClickMonthYear}
              year={showYear}
              moduleName="year"
            />
          ) : null}
          {showPopupPlate === "month" ? (
            <YearMonth onClick={onClickMonthYear} year={showYear} />
          ) : null}
          {showPopupPlate === "date" ? (
            <DatePopuop
              onClick={onClickDate}
              year={showYear}
              month={showMonth}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
export default DatePicker;
