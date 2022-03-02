import "./index.css";
import React from "react";

import { Data } from "../public";
import { timestamp } from "../../../../mixins/timestamp";

type Props = {
  dataArr: Array<Data>;
  daysText?: Array<string>;
  dateText?: {
    year: string;
    month?: string;
  };
  children?: React.ReactNode;
  moduleName?: string;
  disableHeaderButton?: boolean;
};

const DateMemo: React.FC<Props> = (props) => {
  const {
    dataArr,
    daysText = ["日", "一", "二", "三", "四", "五", "六"],
    children,
    dateText = {
      year: timestamp("YYYY年"),
      month: timestamp("MM月"),
    },
    disableHeaderButton = true,
    moduleName = "date",
  } = props;
  return (
    <div className="date-picker-popup-content">
      <div className="date-picker-popup-header">
        <span className="years-month">
          <span
            className={`date-picker-header-text year-text ${
              disableHeaderButton || moduleName === "year" ? "disable-year" : ""
            }`}
            data-data="year"
          >
            {dateText.year}
          </span>
          {dateText.month ? (
            <span
              className={`date-picker-header-text month-text ${
                disableHeaderButton ? "disable-year" : ""
              }`}
              data-data="month"
            >
              {dateText.month}
            </span>
          ) : null}
        </span>
      </div>
      <div className="date-picker-popup-body">
        {children}
        {moduleName === "date"
          ? daysText.map((item) => {
              return (
                <span className="date-picker-popup-day" key={`days-${item}`}>
                  {item}
                </span>
              );
            })
          : null}
        {dataArr?.map((item) => {
          const {
            fullData,
            text,
            isDisableDate,
            which,
            isSelecteDate,
            isFalseChoice,
          } = item;
          return (
            <span
              key={fullData}
              data-data={fullData}
              className={`date-picker-popup-date ${
                isSelecteDate ? "choose-day" : ""
              } ${isDisableDate ? "disable-date" : ""} ${
                isFalseChoice ? "false-choice" : ""
              } ${which}`}
            >
              {text}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(DateMemo);
