import React, { useState, useEffect, useRef, useCallback } from "react";

import "./index.css";

import { timestamp } from "../../../mixins/timestamp";

import DatePopuop from "./date";
import DatePickerTitle from "./datePickerTitle";

import { Segment, DefaultDate, PopupPlate } from "./public";

type Props = {
  className?: string;
  classNamePopup?: string;
  placeholder?: string;
  selectionDate?: Date;
  popupPlate?: PopupPlate;
  defaultDate?: DefaultDate;
  disableDate?: DefaultDate;
  dateSegmentSelection?: boolean;
  dateMultiSelect?: boolean;
  monthSegmentSelection?: boolean;
  monthMultiSelect?: boolean;
  yearSegmentSelection?: boolean;
  yearMultiSelect?: boolean;
  onChange?: (data: DefaultDate) => void;
  showClearButton?: boolean;
  disableHeaderButton?: boolean;
  daysText?: Array<string>;
};
type SegmentSelectionMultiSelect = {
  year: boolean;
  month: boolean;
  date: boolean;
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
    defaultDate,
    disableDate,
    dateSegmentSelection = false,
    monthSegmentSelection = false,
    yearSegmentSelection = false,
    showClearButton = true,
    disableHeaderButton = true,
    daysText = ["日", "一", "二", "三", "四", "五", "六"],
    onChange,
  } = props;
  let _segmentSelection: SegmentSelectionMultiSelect = {
    year: yearSegmentSelection,
    month: monthSegmentSelection,
    date: dateSegmentSelection,
  };
  if (dateSegmentSelection) {
    _segmentSelection = {
      year: false,
      month: false,
      date: dateSegmentSelection,
    };
  } else if (monthSegmentSelection) {
    _segmentSelection = {
      year: false,
      month: monthSegmentSelection,
      date: false,
    };
  } else if (yearSegmentSelection) {
    _segmentSelection = {
      year: yearSegmentSelection,
      month: false,
      date: false,
    };
  }
  let defaultYear = timestamp("YYYY");
  let defaultMonth = timestamp("MM");
  if (selectionDate) {
    defaultYear = timestamp(selectionDate, "YYYY");
    defaultMonth = timestamp(selectionDate, "MM");
  }

  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showPopupPlate, setShowPopupPlate] = useState<PopupPlate>(popupPlate);
  const [dateValue, setDateValue] = useState<string>("");
  const [showYear, setShowYear] = useState<number>(Number(defaultYear));
  const [showMonth, setShowMonth] = useState<number>(Number(defaultMonth));
  const [animation, setAnimation] = useState<string>("");

  useEffect(() => {
    return () => {
      window.removeEventListener("click", lstenerClick);
      clearTimerFun();
    };
  }, []);

  const clearTimerFun = () => {
    clearTimeout(timer.current);
    timer.current = null;
  };

  const lstenerClick = useCallback((event: any) => {
    const target = event.target as HTMLElement;
    if (!target.className.includes("date-picker")) {
      setDateValue("");
      closePopup();
    }
  }, []);

  const closePopup = (): void => {
    setAnimation("date-picker-unanimation");
    window.removeEventListener("click", lstenerClick);
    timer.current = setTimeout(() => {
      setShowPopupPlate(popupPlate);
      setShowPopup(false);
      clearTimerFun();
    }, 100);
  };

  const onFocusBlur = (event: React.ChangeEvent<HTMLElement>) => {
    const { type } = event;
    if (type === "focus") {
      window.addEventListener("click", lstenerClick);
      setShowPopup(true);
      timer.current = setTimeout(() => {
        setAnimation("date-picker-animation");
        clearTimerFun();
      }, 50);
    }
  };

  const nextPopup = () => {
    if (showPopupPlate === "date") return;
    const _next: Array<PopupPlate> = ["year", "month", "date"];
    const Index = _next.indexOf(showPopupPlate);
    const _Stop = _next.indexOf(popupPlate);
    if (_Stop > Index) {
      setShowPopupPlate(_next[Index + 1]);
    }
  };
  const clearInput = (): void => {
    setDateValue("");
  };
  const setDateValueFun = (data: DefaultDate): void => {
    const type = Object.prototype.toString.call(data);
    if (type === "[object Object]") {
      setDateValue(`${(data as Segment).start} ~ ${(data as Segment).end}`);
      if ((data as Segment).end) {
        closePopup();
      }
    } else {
      setDateValue(`${data}`);
      if (
        !dateSegmentSelection &&
        !monthSegmentSelection &&
        !yearSegmentSelection
      ) {
        closePopup();
      }
    }
    if (onChange) {
      onChange(data);
    }
  };

  const onClickDate = (data: DefaultDate) => {
    if (data === "year" || data === "month") {
      changeYearMonth(data as PopupPlate);
    } else {
      if (showPopupPlate === popupPlate) {
        setDateValueFun(data);
      } else {
        if (showPopupPlate === "year") {
          setShowYear(Number(data));
        } else if (showPopupPlate === "month") {
          setShowYear(Number(timestamp(data, "YYYY")));
          setShowMonth(Number(timestamp(data, "MM")));
        }
      }
      nextPopup();
    }
  };

  const changeYearMonth = (data: PopupPlate) => {
    setShowPopupPlate(data);
  };

  const changeDate = (data: any): void => {
    setShowYear(data.year);
    setShowMonth(data.month);
  };

  return (
    <div className={`date-picker ${className}`}>
      <div className="date-picker-data-show">
        <input
          type="text"
          placeholder={placeholder}
          defaultValue={dateValue}
          onFocus={onFocusBlur}
          onBlur={onFocusBlur}
          ref={pickerInput}
          className="date-picker-input"
        />
        {showClearButton ? (
          <span
            className={`date-picker-input-clear ${
              dateValue ? "clear-button-show" : ""
            }`}
            onClick={clearInput}
          >
            x
          </span>
        ) : null}
      </div>
      {showPopup ? (
        <div
          className={`date-picker-popup ${animation} ${classNamePopup} ${showPopupPlate}`}
        >
          <DatePickerTitle
            onClick={changeDate}
            popupPlate={showPopupPlate}
            defaultYear={showYear}
            defaultMonth={showMonth}
          />
          {showPopupPlate ? (
            <DatePopuop
              onClick={onClickDate}
              year={showYear}
              month={showMonth}
              moduleName={showPopupPlate}
              segmentSelection={_segmentSelection[showPopupPlate]}
              defaultDate={defaultDate}
              disableDate={disableDate}
              daysText={daysText}
              disableHeaderButton={disableHeaderButton}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
export default DatePicker;
