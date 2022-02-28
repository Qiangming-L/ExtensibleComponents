import "./index.css";
import React, { useState, useEffect, useLayoutEffect } from "react";

import { timestamp } from "../../../../mixins/timestamp";
import { selecteDateFun, disableDateFun } from "../public";

import { DefaultDate, Segment, Data } from "../public";

import { MonthText } from "./text.js";

import YearMonthMemo from "./yearMonthMemo";

type Props = {
  onClick?: (data: DefaultDate, event: React.MouseEvent<HTMLElement>) => void;
  monthText?: Array<Text>;
  year?: number;
  month?: number;
  defaultDate?: DefaultDate;
  disableDate?: DefaultDate;
  segmentSelection?: boolean;
  multiSelect?: boolean;
  moduleName?: "month" | "year";
};

type Text = {
  value: number;
  text: string;
};

const YearMonth: React.FC<Props> = (props) => {
  const {
    onClick,
    year = Number(timestamp("YYYY")),
    month = Number(timestamp("MM")),
    defaultDate,
    disableDate,
    segmentSelection = false,
    multiSelect = false,
    moduleName = "month",
    monthText = MonthText,
  } = props;

  let _defaultDateValue: DefaultDate = "";
  if (multiSelect) {
    _defaultDateValue = [];
  } else if (segmentSelection) {
    _defaultDateValue = {
      start: "",
      end: "",
    };
  }

  const [updateData, setUpdateData] = useState<DefaultDate>(_defaultDateValue);
  const [yearMonth, setYearMonth] = useState<Array<Data>>();
  const [nextYearMonth, setNextYearMonth] = useState<Array<Data>>();
  const [falseChoice, setFalseChoice] = useState<Segment>({
    start: "",
    end: "",
  });

  useLayoutEffect(() => {
    if (segmentSelection && multiSelect) {
      throw new Error(
        "Only one of segmentSelection and multiSelect can be enabled"
      );
    }
  }, []);

  useEffect(() => {
    changeYearMonthFun();
  }, [updateData, year, month, falseChoice]);

  const onClickFun = (event: React.MouseEvent<HTMLElement>): void => {
    const target = event.target as HTMLElement;
    if (target.className.includes("disable-date")) return;
    let clickData: DefaultDate = `${target.dataset.data}`;
    if (target.className.includes("date-picker-popup-ym")) {
      if (multiSelect) {
        const _clickData: Array<string> = [clickData] as Array<string>;
        clickData = [...(updateData as Array<string>), ..._clickData];
        setUpdateData(clickData);
      } else if (segmentSelection) {
        if (falseChoice.start) {
          setUpdateData({
            start: falseChoice.start,
            end: clickData,
          });
          setFalseChoice({
            start: "",
            end: "",
          });
        } else {
          setFalseChoice({
            start: clickData,
            end: "",
          });
        }
      } else {
        setUpdateData(clickData);
      }
    }
    if (onClick) {
      onClick(clickData, event);
    }
  };
  const onMouse = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    const { type } = event;
    if (target.className.includes("disable-date") || !segmentSelection) return;
    const _data = target.dataset.data;
    if (target.className.includes("date-picker-popup-ym")) {
      if (segmentSelection && falseChoice.start) {
        if (type === "mouseleave") {
          setFalseChoice({
            start: _data,
            end: "",
          });
        } else if (type === "mouseover") {
          setFalseChoice({
            start: falseChoice.start,
            end: _data,
          });
        }
      }
    } else if (
      type === "mouseleave" &&
      target.className.includes("date-picker-popup-content")
    ) {
      setFalseChoice({
        start: falseChoice.start,
        end: "",
      });
    }
  };
  const changeYearMonthFun = () => {
    const _yearMonthArr = yearMonthFun();
    setYearMonth(_yearMonthArr);
    if (segmentSelection) {
      const _yearMonthArr = yearMonthFun(year + 1);
      setNextYearMonth(_yearMonthArr);
    }
  };
  const yearMonthFun = (_year = year): Array<Data> => {
    if (moduleName === "month") {
      const _copyText = JSON.parse(JSON.stringify(monthText));
      const _yearMonthArr: Array<Data> = _copyText.map((item: Text) => {
        const _data = `${_year}-${item.value + 1}`;
        const fullData = `${_year}-${item.value + 1}`;
        let isDisableDate = false;
        let isSelecteDate = false;
        let isFalseChoice = false;
        isSelecteDate = selecteDateFun(_data, updateData);
        if (defaultDate) {
          isSelecteDate = selecteDateFun(_data, defaultDate);
        }
        if (disableDate) {
          isDisableDate = disableDateFun(_data, disableDate);
        }
        if (falseChoice.start) {
          isSelecteDate = selecteDateFun(_data, falseChoice.start);
          isDisableDate = disableDateFun(_data, { end: falseChoice.start });
        }
        if (falseChoice.end) {
          isFalseChoice = selecteDateFun(_data, falseChoice);
        }
        const _dataObj: Data = {
          text: item.text,
          fullData,
          isDisableDate,
          isSelecteDate,
          isFalseChoice,
        };
        return _dataObj;
      });
      return _yearMonthArr;
    } else {
      const _yearArr: Array<Data> = [];
      if (_year.toString().length !== 4) {
        throw new Error("year supports only four digits");
      }
      const _yearText = _year.toString().slice(0, `${_year}`.length - 1);
      const _yearNumber = Number(`${_yearText}0`);
      for (let i = _yearNumber - 1; i <= _yearNumber + 10; i++) {
        const _data = `${i}`;
        const fullData = `${i}`;
        let which = "date-picker-current";
        const _i = Number(i.toString().slice(0, `${i}`.length - 1));
        if (_i < Number(_yearText)) {
          which = "date-picker-before";
        } else if (_i > Number(_yearText)) {
          which = "date-picker-after";
        }
        let isDisableDate = false;
        let isSelecteDate = false;
        let isFalseChoice = false;
        isSelecteDate = selecteDateFun(_data, updateData);
        if (defaultDate) {
          isSelecteDate = selecteDateFun(_data, defaultDate);
        }
        if (disableDate) {
          isDisableDate = disableDateFun(_data, disableDate);
        }
        if (falseChoice.start) {
          isSelecteDate = selecteDateFun(_data, falseChoice.start);
          isDisableDate = disableDateFun(_data, { end: falseChoice.start });
        }
        if (falseChoice.end) {
          isFalseChoice = selecteDateFun(_data, falseChoice);
        }
        const _dataObj: Data = {
          text: i,
          fullData,
          which,
          isDisableDate,
          isSelecteDate,
          isFalseChoice,
        };
        _yearArr.push(_dataObj);
      }
      return _yearArr;
    }
  };

  const yearText = (yearData: number = year): string => {
    let _year = `${yearData}年`;
    if (moduleName === "year") {
      const _text = _year.toString().slice(0, 3);
      _year = `${_text}0-${_text}9`;
    }
    return _year;
  };

  return (
    <div
      className={`date-picker-popup-main ${
        segmentSelection ? "segment-selection" : ""
      }`}
      onClick={onClickFun}
      onMouseOver={onMouse}
      onMouseLeave={onMouse}
    >
      {yearMonth ? (
        <YearMonthMemo data={yearMonth} yearText={yearText()} />
      ) : null}
      {moduleName === "month" && segmentSelection && nextYearMonth ? (
        <YearMonthMemo data={nextYearMonth} yearText={yearText(year + 1)} />
      ) : null}
    </div>
  );
};
export default YearMonth;
