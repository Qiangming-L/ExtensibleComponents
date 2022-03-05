/**
 * @todo date selection
 * @param {String} [className] entire component
 * @param {String} [classNamePopup] popup window
 * @param {String} [placeholder=请选择日期] popup window
 * @param {Date} [selectionDate] default selected date
 * @param {String} [popupPlate=date] open the plate => year/month/date
 * @param {DefaultDate} [defaultDate] default selected date
 * @param {DefaultDate} [disableDate] disable date
 * @param {boolean} [dateSegmentSelection=false] whether to open on the date section of the unsuccessful
 * @param {boolean} [monthSegmentSelection=false] whether to open on the month section of the unsuccessful
 * @param {boolean} [yearSegmentSelection=false] whether to open on the year section of the unsuccessful
 * @param {boolean} [showClearButton=true] whether the clear button is displayed
 * @param {boolean} [disableHeaderButton=true] whether to disable click events for year and year text
 * @param {Array<String>} [daysText] displays the day of the week text
 * @requires module:./date/text
 * @param {Array} [monthText] displays the day of the month text
 * @requires module:./date/text
 * @function onChange The callback function for the selected event
 */
/**
 * @function onChange
 * @param {Object} data date
 *
 */

import "./index.css";
import React, { useState, useEffect, useRef, useCallback } from "react";

/**
 * @requires module:mixins/timestamp
 */
import { timestamp } from "../../../mixins/timestamp";

import DatePopuop from "./date";
import DatePickerTitle from "./datePickerTitle";

import { Segment, DefaultDate, PopupPlate } from "./public";

import { DaysText, MonthText } from "./date/text";

type Props = {
  className?: string;
  classNamePopup?: string;
  placeholder?: string;
  selectionDate?: Date;
  popupPlate?: PopupPlate;
  defaultDate?: DefaultDate;
  disableDate?: DefaultDate;
  dateSegmentSelection?: boolean;
  monthSegmentSelection?: boolean;
  yearSegmentSelection?: boolean;
  showClearButton?: boolean;
  disableHeaderButton?: boolean;
  daysText?: Array<string>;
  monthText?: Array<Text>;
  onChange?: (data: DefaultDate) => void;
};
type Text = {
  value: number;
  text: string;
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
    daysText = DaysText,
    onChange,
    monthText = MonthText,
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
              monthText={monthText}
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
