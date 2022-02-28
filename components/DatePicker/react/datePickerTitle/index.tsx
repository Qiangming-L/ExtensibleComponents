import "./index.css";
import React, { useState, useEffect } from "react";

import { timestamp } from "../../../../mixins/timestamp";

type Props = {
  onClick?: (
    data: { year: number; month: number },
    event: React.MouseEvent<HTMLElement>
  ) => void;
  popupPlate?: string;
  defaultYear?: number;
  defaultMonth?: number;
};

const DatePickerTitle: React.FC<Props> = (props) => {
  const {
    onClick,
    popupPlate = "date",
    defaultYear = Number(timestamp("YYYY")),
    defaultMonth = Number(timestamp("MM")),
  } = props;

  const [showYear, setShowYear] = useState<number>(defaultYear);
  const [showMonth, setShowMonth] = useState<number>(defaultMonth);
  const [yearText, setYearText] = useState<string>("");

  useEffect(() => {
    if (popupPlate === "year") {
      const _text = `${showYear}`.slice(0, `${showYear}`.length - 1);
      setYearText(`${_text}0-${_text}9`);
    } else {
      setYearText(`${showYear}`);
    }
  }, [popupPlate, showYear]);

  const onClickFun = (event: React.MouseEvent<HTMLElement>): void => {
    const target = event.target as HTMLElement;
    const _className = target.className;
    if (popupPlate === "year" && _className.includes("date-picker-year")) {
      return;
    }
    let _year = showYear;
    let _month = showMonth;
    if (_className.includes("before-years")) {
      if (popupPlate === "year") {
        _year -= 10;
      } else {
        _year -= 1;
      }
    } else if (_className.includes("next-years")) {
      if (popupPlate === "year") {
        _year += 10;
      } else {
        _year += 1;
      }
    } else if (_className.includes("before-month")) {
      if (showMonth === 1) {
        _year -= 1;
        _month = 12;
      } else {
        _month -= 1;
      }
    } else if (_className.includes("next-month")) {
      if (showMonth === 12) {
        _year += 1;
        _month = 1;
      } else {
        _month += 1;
      }
    }
    setShowYear(_year);
    setShowMonth(_month);
    if (onClick) {
      onClick({ year: _year, month: _month }, event);
    }
  };

  return (
    <div className="date-picker-popup-title" onClick={onClickFun}>
      <div className="picker-title-left">
        <span className="poput-change before-years">&lt;&lt;</span>
        {popupPlate === "date" ? (
          <span className="poput-change before-month">&lt;</span>
        ) : null}
      </div>
      <div className="picker-title-right">
        {popupPlate === "date" ? (
          <span className="poput-change next-month">&gt;</span>
        ) : null}
        <span className="poput-change next-years">&gt;&gt;</span>
      </div>
    </div>
  );
};

export default DatePickerTitle;
