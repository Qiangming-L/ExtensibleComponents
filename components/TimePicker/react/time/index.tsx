import "./index.css";
import React, { useState, useEffect, useRef } from "react";

import TimeMemo from "./timeMemo";

import { timestamp } from "../../mixins/timestamp";
import { antiShake } from "../../mixins/antiShake";

type Props = {
  optionHeight?: number;
  amount?: number;
  onSureClick?: (time: string) => void;
};
type DataShow = {
  value: string | number;
  key?: string | number;
  className?: string;
};
type ModuleName = "hours" | "minutes" | "seconds";
type ModuleData = {
  value: number;
  animation: boolean;
  style?: React.CSSProperties;
};

const TimePopup: React.FC<Props> = (props) => {
  const timer: any = useRef(null);
  const MaximumHours = 23;
  const MaximumMinutes = 59;

  const { optionHeight = 30, amount = 11, onSureClick } = props;

  const Half = Math.floor(amount / 2);

  const [hours, setHours] = useState<ModuleData>({
    value: Number(timestamp("hh")),
    animation: true,
    style: undefined,
  });
  const [minutes, setMinutes] = useState<ModuleData>({
    value: Number(timestamp("mm")),
    animation: true,
    style: undefined,
  });
  const [seconds, setSeconds] = useState<ModuleData>({
    value: Number(timestamp("ss")),
    animation: true,
    style: undefined,
  });
  const [hoursShow, setHoursShow] = useState<Array<DataShow>>();
  const [minutesShow, setMinutesShow] = useState<Array<DataShow>>();
  const [secondsShow, setSecondsShow] = useState<Array<DataShow>>();

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, []);

  const clearTimer = () => {
    timer.current = null;
    clearTimeout(timer.current);
  };

  useEffect(() => {
    if (hours.animation) {
      updateTime(hours.value, MaximumHours, "hours");
    }
  }, [hours.value]);
  useEffect(() => {
    if (minutes.animation) {
      updateTime(minutes.value, MaximumMinutes, "minutes");
    }
  }, [minutes.value]);
  useEffect(() => {
    if (seconds.animation) {
      updateTime(seconds.value, MaximumMinutes, "seconds");
    }
  }, [seconds.value]);

  const updateTime = (_time: number, _max: number, module: ModuleName) => {
    if (module === "hours") {
      setHoursShow(initializeTime(_time, _max, module));
      setHours({
        ...hours,
        ...{
          style: {
            transform: `translateY(-${(_time + Half + 1) * optionHeight}px)`,
          },
        },
      });
      if (0 > _time) {
        antiShake(() => {
          setHours({
            value: _max + 2 + _time,
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
          setHours({
            value: _time - _max - 1,
            animation: false,
            style: {
              transform: `translateY(-${
                (_time + Half - _max) * optionHeight
              }px)`,
              transition: "all",
            },
          });
        }, 300);
      }
    } else if (module === "minutes") {
      setMinutesShow(initializeTime(_time, _max, module));
      setMinutes({
        ...minutes,
        ...{
          style: {
            transform: `translateY(-${(_time + Half + 1) * optionHeight}px)`,
          },
        },
      });
      if (0 > _time) {
        antiShake(() => {
          setMinutes({
            value: _max + 2 + _time,
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
          setMinutes({
            value: _time - _max - 1,
            animation: false,
            style: {
              transform: `translateY(-${
                (_time + Half - _max) * optionHeight
              }px)`,
              transition: "all",
            },
          });
        }, 300);
      }
    } else if (module === "seconds") {
      setSecondsShow(initializeTime(_time, _max, module));
      setSeconds({
        ...seconds,
        ...{
          style: {
            transform: `translateY(-${(_time + Half + 1) * optionHeight}px)`,
          },
        },
      });
      if (0 > _time) {
        antiShake(() => {
          setSeconds({
            value: _max + 2 + _time,
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
          setSeconds({
            value: _time - _max - 1,
            animation: false,
            style: {
              transform: `translateY(-${
                (_time + Half - _max) * optionHeight
              }px)`,
              transition: "all",
            },
          });
        }, 300);
      }
    }
  };

  const initializeTime = (
    _time: number,
    max: number,
    module: ModuleName
  ): Array<DataShow> => {
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
        key: `pop-${item.key}`,
        className: `${module}-pop`,
      };
    });
    const _push = _copy.splice(0, amount).map((item: DataShow) => {
      return {
        value: item.value,
        key: `push-${item.key}`,
        className: `${module}-push`,
      };
    });
    return [...[], ..._pop, ...initializeArr, ..._push];
  };

  const onClickFun = (event: React.MouseEvent<HTMLDivElement>) => {
    const targt = event.target as HTMLDivElement;
    const _className = targt.className;
    if (_className.includes("time-picker-popup-option")) {
      if (_className.includes("select-hours")) {
        if (_className.includes("hours-pop")) {
          setHours({
            ...hours,
            ...{
              value: Number(targt.innerText) - MaximumHours - 1,
              animation: true,
            },
          });
        } else if (_className.includes("hours-push")) {
          setHours({
            ...hours,
            ...{
              value: MaximumHours + 1 + Number(targt.innerText),
              animation: true,
            },
          });
        } else {
          setHours({
            ...hours,
            ...{
              value: Number(targt.innerText),
              animation: true,
            },
          });
        }
      } else if (_className.includes("select-minutes")) {
        if (_className.includes("minutes-pop")) {
          setMinutes({
            ...minutes,
            ...{
              value: Number(targt.innerText) - MaximumMinutes - 1,
              animation: true,
            },
          });
        } else if (_className.includes("hours-push")) {
          setMinutes({
            ...minutes,
            ...{
              value: MaximumMinutes + 1 + Number(targt.innerText),
              animation: true,
            },
          });
        } else {
          setMinutes({
            ...minutes,
            ...{
              value: Number(targt.innerText),
              animation: true,
            },
          });
        }
      } else if (_className.includes("select-seconds")) {
        if (_className.includes("seconds-pop")) {
          setSeconds({
            ...seconds,
            ...{
              value: Number(targt.innerText) - MaximumMinutes - 1,
              animation: true,
            },
          });
        } else if (_className.includes("hours-push")) {
          setSeconds({
            ...seconds,
            ...{
              value: MaximumMinutes + 1 + Number(targt.innerText),
              animation: true,
            },
          });
        } else {
          setSeconds({
            ...seconds,
            ...{
              value: Number(targt.innerText),
              animation: true,
            },
          });
        }
      }
    }
  };

  const onScrollFun = (event: React.WheelEvent<HTMLDivElement>) => {
    const targt = event.target as HTMLDivElement;
    const _className = targt.className;
    if (_className.includes("time-picker-popup-option")) {
      if (_className.includes("select-hours")) {
        setHours({
          ...hours,
          ...{
            value: hours.value + (event.deltaY > 0 ? 1 : -1),
            animation: true,
          },
        });
      } else if (_className.includes("select-minutes")) {
        setMinutes({
          ...minutes,
          ...{
            value: minutes.value + (event.deltaY > 0 ? 1 : -1),
            animation: true,
          },
        });
      } else if (_className.includes("select-seconds")) {
        setSeconds({
          ...seconds,
          ...{
            value: seconds.value + (event.deltaY > 0 ? 1 : -1),
            animation: true,
          },
        });
      }
    }
  };

  const textShow = (value: string | number): string => {
    if (value.toString().length === 1) {
      return `0${value}`;
    }
    return value.toString();
  };

  const timeSure = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (onSureClick) {
      onSureClick(
        `${textShow(hours.value)}:${textShow(minutes.value)}:${textShow(
          seconds.value
        )}`
      );
    }
  };

  return (
    <div className="time-picker-popup-main" onClick={onClickFun}>
      <div className="data-picker-choose-time" />
      {hoursShow ? (
        <TimeMemo
          showArr={hoursShow}
          currentTime={hours.value}
          selectClassName="select-hours"
          style={hours.style}
          amount={amount}
          optionHeight={optionHeight}
          onScroll={onScrollFun}
        />
      ) : null}
      {minutesShow ? (
        <TimeMemo
          showArr={minutesShow}
          currentTime={minutes.value}
          selectClassName="select-minutes"
          style={minutes.style}
          amount={amount}
          optionHeight={optionHeight}
          onScroll={onScrollFun}
        />
      ) : null}
      {secondsShow ? (
        <TimeMemo
          showArr={secondsShow}
          currentTime={seconds.value}
          selectClassName="select-seconds"
          style={seconds.style}
          amount={amount}
          optionHeight={optionHeight}
          onScroll={onScrollFun}
        />
      ) : null}
      <span className="time-picker-popup-main-sure" onClick={timeSure}>
        确定
      </span>
    </div>
  );
};

export default TimePopup;
