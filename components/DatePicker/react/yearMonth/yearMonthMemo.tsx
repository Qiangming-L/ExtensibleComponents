import React from "react";

import { Data } from "../public";
import { timestamp } from "../../../../mixins/timestamp";

type Props = {
  data: Array<Data>;
  yearText?: string;
};

const YearMonthMemo: React.FC<Props> = (props) => {
  const { data, yearText = `${timestamp("YYYY")}年` } = props;

  return (
    <div className="date-picker-popup-content">
      <div className="date-picker-popup-header">
        <span className="years-month">
          <span className="date-picker-year">{yearText}</span>
        </span>
      </div>
      <div className="date-picker-popup-body">
        {data?.map((item) => {
          const {
            fullData,
            text,
            isDisableDate,
            isSelecteDate,
            isFalseChoice,
            which,
          } = item;
          return (
            <span
              key={fullData}
              data-data={fullData}
              className={`date-picker-popup-ym ${
                isSelecteDate ? "choose-day" : ""
              } ${isDisableDate ? "disable-date" : ""} ${
                isFalseChoice ? "false-choice" : ""
              } ${which}
              `}
            >
              {text}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(YearMonthMemo);
