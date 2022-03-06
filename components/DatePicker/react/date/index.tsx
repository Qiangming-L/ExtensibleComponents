/**
 * @function onClick Selected date
 * @param {Array} [monthText] displays the day of the month text
 * @requires module:./text.js
 * @param {Number} [month=MM] month displayed
 * @example month=02
 * @param {Number} [year=YYYY] year displayed
 * @example year=2002
 * @param {DefaultDate} [defaultDate] default selected date
 * @param {DefaultDate} [disableDate] disable date
 * @param {Boolean} [segmentSelection=fasle] whether to turn on paragraph selection
 * @param {String} [moduleName=date] open the plate => year/month/date
 * @param {Array} [daysText] displays the day of the week text
 * @requires module:./text.js
 * @param {Boolean} [disableHeaderButton=true] whether to disable click events for year and year text
 *
 */
/**
 * @function onClick
 * @param {DefaultDate} date Selected date
 * @event event
 *
 */

import "./index.css";
import React, { useState, useEffect } from "react";

import DateMemo from "./dateMemo";
/**
 * @requires module:mixins/timestamp
 */
import { timestamp } from "../../../../mixins/timestamp";
import { selecteDateFun, disableDateFun } from "../public";

import { MonthText, DaysText } from "./text.js";

import { DefaultDate, Segment, Data, PopupPlate } from "../public";

type Props = {
  onClick?: (date: DefaultDate, event?: React.MouseEvent<HTMLElement>) => void;
  monthText?: Array<Text>;
  month?: number;
  year?: number;
  defaultDate?: DefaultDate;
  disableDate?: DefaultDate;
  segmentSelection?: boolean;
  moduleName?: PopupPlate;
  daysText?: Array<string>;
  disableHeaderButton?: boolean;
};
type Text = {
  value: number;
  text: string;
};

const DatePopuop: React.FC<Props> = (props) => {
  const {
    month = Number(timestamp("MM")),
    year = Number(timestamp("YYYY")),
    segmentSelection = false,
    disableHeaderButton = true,
    defaultDate,
    disableDate,
    moduleName = "date",
    monthText = MonthText,
    daysText = DaysText,
    onClick,
  } = props;

  let _defaultDateValue: DefaultDate = "";

  if (segmentSelection) {
    _defaultDateValue = {
      start: "",
      end: "",
    };
  }
  const [datesFirst, setDatesFirst] = useState<Array<Data>>();
  const [datesSecond, setDatesSecond] = useState<Array<Data>>();
  const [falseChoice, setFalseChoice] = useState<Segment>({
    start: "",
    end: "",
  });
  const [updateData, setUpdateData] = useState<DefaultDate>(_defaultDateValue);

  useEffect(() => {
    changeDateFun();
  }, [updateData, falseChoice, year, month, moduleName]);

  const onClickFun = (event: React.MouseEvent<HTMLElement>): void => {
    const target = event.target as HTMLElement;
    if (target.className.includes("disable-date")) return;
    if (!target.dataset.data) return;
    let clickDate: DefaultDate = `${target.dataset.data}`;
    const _data: DefaultDate = `${target.dataset.data}`;
    if (target.className.includes("date-picker-popup-date")) {
      if (segmentSelection) {
        if (falseChoice.start) {
          clickDate = {
            start: falseChoice.start,
            end: _data,
          };
          setFalseChoice({
            start: "",
            end: "",
          });
          setUpdateData(clickDate);
        } else {
          setFalseChoice({
            start: _data,
            end: "",
          });
        }
      } else {
        clickDate = _data;
        setUpdateData(clickDate);
      }
    } else if (target.className.includes("date-picker-header-text")) {
      if (disableHeaderButton || moduleName === "year") return;
      clickDate = _data;
    }
    if (onClick) {
      onClick(clickDate, event);
    }
  };
  const onMouse = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    const { type } = event;
    if (target.className.includes("disable-date") || !segmentSelection) return;
    if (target.className.includes("date-picker-popup-date")) {
      const _data = target.dataset.data;
      if (segmentSelection && falseChoice.start) {
        if (type === "mouseleave") {
          setFalseChoice({
            start: falseChoice.start,
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
      target.className.includes("date-picker-popup")
    ) {
      setFalseChoice({
        start: falseChoice.start,
        end: "",
      });
    }
  };
  const changeDateFun = (): void => {
    const dataArr = dateFun();
    setDatesFirst(dataArr);
    if (segmentSelection) {
      if (moduleName === "date") {
        if (month === 12) {
          const dataArr = dateFun(year + 1, 1);
          setDatesSecond(dataArr);
        } else {
          const dataArr = dateFun(year, month + 1);
          setDatesSecond(dataArr);
        }
      } else if (moduleName === "month") {
        const dataArr = dateFun(year + 1);
        setDatesSecond(dataArr);
      }
    }
  };
  const dateFun = (
    showYear: number = year,
    showMonth: number = month
  ): Array<Data> => {
    let dataArr: Array<Data> = [];
    if (moduleName === "date") {
      let firstDay = new Date(showYear, showMonth - 1, 1).getDay();
      const { beforeYear, beforeMonth, afterYear, afterMonth, beforeDate } =
        calculateBefore(showYear, showMonth);
      const __datas = new Date(showYear, showMonth, 0).getDate();
      dataArr = [
        ...[],
        ...forElement(
          beforeDate - firstDay + 1,
          beforeDate + 1,
          beforeYear,
          beforeMonth,
          "date-picker-before"
        ),
        ...forElement(1, __datas + 1, showYear, showMonth),
      ];
      const Length = dataArr.length;
      let afterArr: Array<Data> = forElement(
        1,
        42 - Length,
        afterYear,
        afterMonth,
        "date-picker-after"
      );
      return [...dataArr, ...afterArr];
    } else if (moduleName === "month") {
      const _copyText = JSON.parse(JSON.stringify(monthText));
      const _monthArr: Array<Data> = _copyText.map((item: Text) => {
        const _data = `${showYear}-${item.value + 1}`;
        const fullData = `${showYear}-${item.value + 1}`;
        const _value = dataFun(item.text, _data, fullData);
        return _value;
      });
      dataArr = _monthArr;
    } else {
      if (showYear.toString().length !== 4) {
        throw new Error("year supports only four digits");
      }
      const _yearArr: Array<Data> = [];
      const _yearText = showYear.toString().slice(0, `${showYear}`.length - 1);
      const _yearNumber = Number(`${_yearText}0`);
      for (let i = _yearNumber - 1; i <= _yearNumber + 10; i++) {
        const _data = `${i}`;
        const fullData = `${i}`;
        const _i = Number(i.toString().slice(0, `${i}`.length - 1));
        if (_i < Number(_yearText)) {
          _yearArr.push(dataFun(i, _data, fullData, "date-picker-before"));
        } else if (_i > Number(_yearText)) {
          _yearArr.push(dataFun(i, _data, fullData, "date-picker-after"));
        } else {
          _yearArr.push(dataFun(i, _data, fullData));
        }
      }
      dataArr = _yearArr;
    }
    return dataArr;
  };
  const calculateBefore = (year: number, month: number): any => {
    let beforeYear = year;
    let beforeMonth = month - 1;
    let afterYear = year;
    let afterMonth = month + 1;
    let beforeDate = new Date(year, month - 1, 0).getDate();
    if (month === 1) {
      beforeDate = new Date(year - 1, 12, 0).getDate();
      beforeYear = year - 1;
      beforeMonth = 12;
    } else if (month === 12) {
      afterYear = year + 1;
      afterMonth = 1;
    }
    return {
      beforeYear,
      beforeMonth,
      afterYear,
      afterMonth,
      beforeDate,
    };
  };
  const dataFun = (
    value: string | number,
    _date: string,
    fullData: string,
    which: string = "date-picker-current"
  ): Data => {
    let isDisableDate = false;
    let isSelecteDate = false;
    let isFalseChoice = false;
    isSelecteDate = selecteDateFun(_date, updateData);
    if (defaultDate) {
      isSelecteDate = selecteDateFun(_date, defaultDate);
    }
    if (falseChoice.start) {
      isSelecteDate = selecteDateFun(_date, falseChoice.start);
      isDisableDate = disableDateFun(
        _date,
        { end: falseChoice.start },
        moduleName,
        true
      );
    }
    if (falseChoice.end) {
      isFalseChoice = selecteDateFun(_date, falseChoice);
    }
    if (disableDate) {
      isDisableDate = disableDateFun(_date, disableDate, moduleName);
    }
    return {
      text: value,
      fullData,
      which,
      isDisableDate,
      isSelecteDate,
      isFalseChoice,
    };
  };

  const forElement = (
    number: number,
    length: number,
    showYear: number = year,
    showMonth: number = month,
    which: string = "date-picker-current"
  ): Array<Data> => {
    const element: Array<Data> = [];
    for (let i = number; i < length; i++) {
      const _date = `${showYear}-${showMonth}-${i}`;
      const fullData = timestamp(_date, "YYYY-MM-DD");
      element.push(dataFun(i, _date, fullData, which));
    }
    return element;
  };

  const dateText = (
    next: boolean = false,
    yearVlaue: number = Number(year),
    monthValue: number = Number(month)
  ): { year: string; month?: string } => {
    let _text: {
      year: string;
      month?: string;
    } = {
      year: yearVlaue.toString(),
    };
    if (moduleName === "date") {
      _text = {
        year: `${yearVlaue}年`,
        month: `${monthValue}月`,
      };
      if (next) {
        if (monthValue === 12) {
          _text = {
            year: `${yearVlaue + 1}年`,
            month: `1月`,
          };
        } else {
          _text = {
            year: `${yearVlaue}年`,
            month: `${monthValue + 1}月`,
          };
        }
      }
      return _text;
    } else if (moduleName === "year") {
      const _year = yearVlaue.toString().slice(0, 3);
      _text = {
        year: `${_year}0-${_year}9`,
      };
    } else {
      _text = {
        year: `${yearVlaue}年`,
      };
      if (next) {
        _text = {
          year: `${yearVlaue + 1}年`,
        };
      }
    }
    return _text;
  };

  return (
    <div
      className={`date-picker-popup-main ${
        segmentSelection && moduleName !== "year" ? "segment-selection" : ""
      }`}
      onClick={onClickFun}
      onMouseOver={onMouse}
      onMouseLeave={onMouse}
    >
      {datesFirst ? (
        <DateMemo
          dataArr={datesFirst}
          dateText={dateText()}
          moduleName={moduleName}
          daysText={daysText}
          disableHeaderButton={disableHeaderButton}
        />
      ) : null}
      {datesSecond && segmentSelection && moduleName !== "year" ? (
        <DateMemo
          dataArr={datesSecond}
          dateText={dateText(true)}
          moduleName={moduleName}
          daysText={daysText}
          disableHeaderButton={disableHeaderButton}
        />
      ) : null}
    </div>
  );
};

export default DatePopuop;
