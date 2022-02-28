import "./index.css";
import React from "react";

import { Data } from "../public";
import { timestamp } from "../../../../mixins/timestamp";

type Props = {
  dataArr: Array<Data>;
  daysText?: Array<string>;
  dateText?: string;
  children?: React.ReactNode;
};

const DateMemo: React.FC<Props> = (props) => {
  const {
    dataArr,
    daysText = ["日", "一", "二", "三", "四", "五", "六"],
    children,
    dateText = timestamp("YYYY年MM月"),
  } = props;
  return (
    <div className="date-picker-popup-content">
      <div className="date-picker-popup-header">
        <span className="years-month">
          <span className="date-picker-year">{dateText}</span>
        </span>
      </div>
      <div className="date-picker-popup-body">
        {children}
        {daysText.map((item) => {
          return (
            <span className="date-picker-popup-day" key={`days-${item}`}>
              {item}
            </span>
          );
        })}
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
