import React, { useState, useEffect, useLayoutEffect } from "react";

import DateMemo from "./dateMemo";

import { timestamp } from "../../../../mixins/timestamp";
import { selecteDateFun, disableDateFun } from "../public";

import { DefaultDate, Segment, Data } from "../public";

type Props = {
  onClick?: (date: DefaultDate, event: React.MouseEvent<HTMLElement>) => void;
  month?: number;
  year?: number;
  defaultDate?: DefaultDate;
  disableDate?: DefaultDate;
  segmentSelection?: boolean;
  multiSelect?: boolean;
};

const DatePopuop: React.FC<Props> = (props) => {
  const {
    month = Number(timestamp("MM")),
    year = Number(timestamp("YYYY")),
    segmentSelection = false,
    multiSelect = false,
    defaultDate,
    disableDate = { end: timestamp("YYYY-MM-DD") },
    onClick,
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
  const [datesFirst, setDatesFirst] = useState<Array<Data>>();
  const [datesSecond, setDatesSecond] = useState<Array<Data>>();
  const [falseChoice, setFalseChoice] = useState<Segment>({
    start: "",
    end: "",
  });
  const [updateData, setUpdateData] = useState<DefaultDate>(_defaultDateValue);

  useLayoutEffect(() => {
    if (segmentSelection && multiSelect) {
      throw new Error(
        "Only one of segmentSelection and multiSelect can be enabled"
      );
    }
  }, []);

  useEffect(() => {
    changeDateFun();
  }, [updateData, falseChoice, year, month]);

  const onClickFun = (event: React.MouseEvent<HTMLElement>): void => {
    const target = event.target as HTMLElement;
    if (target.className.includes("disable-date")) return;
    let clickDate: DefaultDate = timestamp(target.dataset.data, "YYYY-MM-DD");
    const _date: string = timestamp(target.dataset.data, "YYYY-MM-DD");
    if (target.className.includes("date-picker-popup-date")) {
      if (multiSelect) {
        clickDate = [...(updateData as Array<string | Date>), ...[_date]];
        setUpdateData(clickDate);
      } else if (segmentSelection) {
        if (falseChoice.start) {
          clickDate = {
            start: falseChoice.start,
            end: _date,
          };
          setFalseChoice({
            start: "",
            end: "",
          });
          setUpdateData(clickDate);
        } else {
          setFalseChoice({
            start: _date,
            end: "",
          });
        }
      } else {
        clickDate = _date;
        setUpdateData(clickDate);
      }
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
      if (segmentSelection && falseChoice.start) {
        if (type === "mouseleave") {
          setFalseChoice({
            start: timestamp(target.dataset.data, "YYYY-MM-DD"),
            end: "",
          });
        } else if (type === "mouseover") {
          setFalseChoice({
            start: falseChoice.start,
            end: timestamp(target.dataset.data, "YYYY-MM-DD"),
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

  const dateFun = (
    showYear: number = year,
    showMonth: number = month
  ): Array<Data> => {
    let firstDay = new Date(showYear, showMonth - 1, 1).getDay();
    let lastDay = new Date(
      showYear,
      showMonth - 1,
      new Date(showYear, showMonth, 0).getDate()
    ).getDay();
    const { beforeYear, beforeMonth, afterYear, afterMonth, beforeDate } =
      calculateBefore(showYear, showMonth);
    const __datas = new Date(showYear, showMonth, 0).getDate();
    const dataArr: Array<Data> = [
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
  };

  const changeDateFun = (): void => {
    const dataArr = dateFun();
    setDatesFirst(dataArr);
    if (segmentSelection) {
      if (month === 12) {
        const dataArr = dateFun(year + 1, 1);
        setDatesSecond(dataArr);
      } else {
        const dataArr = dateFun(year, month + 1);
        setDatesSecond(dataArr);
      }
    }
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
      let isDisableDate = false;
      let isSelecteDate = false;
      let isFalseChoice = false;
      isSelecteDate = selecteDateFun(_date, updateData);
      if (defaultDate) {
        isSelecteDate = selecteDateFun(_date, defaultDate);
      }
      if (disableDate) {
        isDisableDate = disableDateFun(_date, disableDate);
      }
      if (falseChoice.start) {
        isSelecteDate = selecteDateFun(_date, falseChoice.start);
        isDisableDate = disableDateFun(_date, { end: falseChoice.start });
      }
      if (falseChoice.end) {
        isFalseChoice = selecteDateFun(_date, falseChoice);
      }
      element.push({
        text: i,
        fullData,
        which,
        isDisableDate,
        isSelecteDate,
        isFalseChoice,
      });
    }
    return element;
  };

  const dateText = (): string => {
    let _text = `${year}年${month + 1}月`;
    if (month === 12) {
      _text = `${year + 1}年${1}月`;
    }
    return _text;
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
      {datesFirst ? (
        <DateMemo dataArr={datesFirst} dateText={`${year}年${month}月`} />
      ) : null}
      {datesSecond && segmentSelection ? (
        <DateMemo dataArr={datesSecond} dateText={dateText()} />
      ) : null}
    </div>
  );
};

export default DatePopuop;
