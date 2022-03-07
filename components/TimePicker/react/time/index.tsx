/**
 * @todo time selector logic component
 * @param {Number} maxTime maximum display time
 * @param {String} moduleName The name of the module displayed by the current component
 * @param {Number} [optionHeight=30] the height of each option
 * @param {Number} [amount=11] How many are displayed,Singular only
 * @param {Number} [defaultTime] Default selected time
 * @function selectedTimeFun select the function of time
 */
/**
 * @function selectedTimeFun
 * @param {String|Number} time select time
 * @param {String} moduleName The name of the module displayed by the current component
 */

import "./index.css";
import React, { useState, useEffect, useLayoutEffect } from "react";

import TimeMemo from "./timeMemo";

/**
 * @requires module:mixins/antiShake
 */
import { antiShake } from "../../mixins/antiShake";

type Props = {
  maxTime: number;
  moduleName: ModuleName;
  optionHeight?: number;
  amount?: number;
  defaultTime?: number;
  selectedTimeFun?: (time: string | number, moduleName: ModuleName) => void;
};
type ModuleName = "hours" | "minutes" | "seconds";
type DataShow = {
  value: string | number;
  key?: string | number;
  className?: string;
};
type ModuleData = {
  value: number;
  animation: boolean;
  style?: React.CSSProperties;
};

const TimePopup: React.FC<Props> = (props) => {
  const {
    maxTime,
    moduleName,
    optionHeight = 30,
    amount = 11,
    defaultTime = 0,
    selectedTimeFun,
  } = props;

  const Half = Math.floor(amount / 2);

  const [time, setTime] = useState<ModuleData>({
    value: defaultTime,
    animation: true,
    style: undefined,
  });
  const [hoursShow, setHoursShow] = useState<Array<DataShow>>();

  useLayoutEffect(() => {
    if (amount % 2 === 0) {
      throw new Error("amount only accepts a singular number as an argument");
    }
  }, []);

  useEffect(() => {
    if (time.animation) {
      updateTime(time.value, maxTime);
    }
    if (time.value >= 0 && time.value <= maxTime && selectedTimeFun) {
      selectedTimeFun(time.value, moduleName);
    }
  }, [time.value]);

  const updateTime = (_time: number, _max: number) => {
    setHoursShow(initializeTime(_time, _max));
    setTime({
      ...time,
      ...{
        style: {
          transform: `translateY(-${(_time + Half + 1) * optionHeight}px)`,
        },
      },
    });
    if (0 > _time) {
      antiShake(() => {
        setTime({
          value: _max + 1 + _time,
          animation: false,
          style: {
            transform: `translateY(-${
              (_max + _time + Half + 2) * optionHeight
            }px)`,
            transition: "all",
          },
        });
      }, 300);
    } else if (_time > _max) {
      antiShake(() => {
        setTime({
          value: _time - _max - 1,
          animation: false,
          style: {
            transform: `translateY(-${(_time + Half - _max) * optionHeight}px)`,
            transition: "all",
          },
        });
      }, 300);
    }
  };

  const initializeTime = (_time: number, max: number): Array<DataShow> => {
    let initializeArr = [];
    for (let i = 0; i <= max; i++) {
      initializeArr.push({
        value: i,
        key: i,
        className: "",
      });
    }
    const _copy = JSON.parse(JSON.stringify(initializeArr));
    const _pop = _copy.splice(_copy.length - amount).map((item: DataShow) => {
      return {
        value: item.value,
        key: `time-pop-option-${item.key}`,
      };
    });
    const _push = _copy.splice(0, amount).map((item: DataShow) => {
      return {
        value: item.value,
        key: `time-push-option-${item.key}`,
      };
    });
    return [...[], ..._pop, ...initializeArr, ..._push];
  };

  const onClickFun = (event: React.MouseEvent<HTMLDivElement>) => {
    const targt = event.target as HTMLDivElement;
    const _className = targt.className;
    if (_className.includes("time-picker-popup-option")) {
      if (_className.includes("time-pop-option")) {
        setTime({
          ...time,
          ...{
            value: Number(targt.innerText) - maxTime - 1,
            animation: true,
          },
        });
      } else if (_className.includes("time-push-option")) {
        setTime({
          ...time,
          ...{
            value: maxTime + 1 + Number(targt.innerText),
            animation: true,
          },
        });
      } else {
        setTime({
          ...time,
          ...{
            value: Number(targt.innerText),
            animation: true,
          },
        });
      }
    }
  };

  const onScrollFun = (event: React.WheelEvent<HTMLDivElement>) => {
    const targt = event.target as HTMLDivElement;
    const _className = targt.className;
    if (_className.includes("time-picker-popup-option")) {
      setTime({
        ...time,
        ...{
          value: time.value + (event.deltaY > 0 ? 1 : -1),
          animation: true,
        },
      });
    }
  };

  return (
    <div className="time-picker-popup-main" onClick={onClickFun}>
      {hoursShow ? (
        <TimeMemo
          showArr={hoursShow}
          currentTime={time.value}
          style={time.style}
          amount={amount}
          optionHeight={optionHeight}
          onScroll={onScrollFun}
        />
      ) : null}
      <div className="time-picker-choose-time" />
    </div>
  );
};

export default TimePopup;
