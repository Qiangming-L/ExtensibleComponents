/**
 * @todo time selection module
 * @param {String} [className]
 * @param {String} [classNamePopup]
 * @param {Boolean} [showClearButton=true] whether the clear button is displayed
 * @param {String} [placeholder=请选择时间] input
 * @param {Number} [optionHeight=30] the height of each option
 * @param {Number} [amount=11] How many are displayed,Singular only
 * @param {String} [defaultTime] Default selected time
 * @example defaultTime="12:00:00"
 * @function onClick confirm the time selection trigger event
 */
/**
 * @function onClick
 * @param {string} time The selected time
 */
import "./index.css";
import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";

import TimePopup from "./time";

type Props = {
  className?: string;
  classNamePopup?: string;
  showClearButton?: boolean;
  placeholder?: string;
  optionHeight?: number;
  amount?: number;
  defaultTime?: string;
  onClick?: (time?: string) => void;
};
type ModuleName = "hours" | "minutes" | "seconds";

const TimePicker: React.FC<Props> = (props) => {
  const timer: any = useRef(null);
  const {
    className = "",
    classNamePopup = "",
    showClearButton = true,
    placeholder = "请选择时间",
    optionHeight = 30,
    amount = 11,
    defaultTime,
    onClick,
  } = props;
  let defaultHoursTime: number = 0,
    defaultMinutesTime: number = 0,
    defaultSecondsTime: number = 0;

  if (defaultTime) {
    if (defaultTime.includes(":")) {
      const _defaultTime = defaultTime.split(":");
      if (_defaultTime.length > 2) {
        defaultHoursTime = Number(_defaultTime[0]);
        defaultMinutesTime = Number(_defaultTime[1]);
        defaultSecondsTime = Number(_defaultTime[2]);
      }
    } else {
      throw new Error("Please pass in time data like xx:xx:xx");
    }
  }

  const [timeValue, setTimeValue] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [animation, setAnimation] = useState<string>("");
  const [hours, setHours] = useState<string | number>("");
  const [minutes, setMinutes] = useState<string | number>("");
  const [seconds, setSeconds] = useState<string | number>("");

  useLayoutEffect(() => {
    if (amount % 2 === 0) {
      throw new Error("amount only accepts a singular number as an argument");
    }
  }, []);

  useEffect(() => {
    return () => {
      clearTimerFun();
    };
  }, []);

  const clearTimerFun = () => {
    clearTimeout(timer.current);
    timer.current = null;
  };
  const onFocusBlur = (event: React.ChangeEvent<HTMLElement>) => {
    const { type } = event;
    if (type === "focus") {
      window.addEventListener("click", lstenerClick);
      setShowPopup(true);
      timer.current = setTimeout(() => {
        setAnimation("time-picker-animation");
        clearTimerFun();
      }, 50);
    }
  };
  const lstenerClick = useCallback((event: any) => {
    const target = event.target as HTMLElement;
    if (!target.className.includes("time-picker")) {
      setTimeValue("");
      closePopup();
    }
  }, []);
  const closePopup = (): void => {
    setAnimation("time-picker-unanimation");
    window.removeEventListener("click", lstenerClick);
    timer.current = setTimeout(() => {
      setShowPopup(false);
      clearTimerFun();
    }, 100);
  };
  const clearInput = () => {
    setTimeValue("");
  };
  const selectedTimeFun = (time: number | string, moduleName: ModuleName) => {
    if (!time) return;
    if (moduleName === "hours") {
      setHours(time);
    } else if (moduleName === "minutes") {
      setMinutes(time);
    } else {
      setSeconds(time);
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
    if (hours && minutes && seconds) {
      const _time = `${textShow(hours)}:${textShow(minutes)}:${textShow(
        seconds
      )}`;
      setTimeValue(_time);
      if (onClick) {
        onClick(_time);
      }
      closePopup();
    }
  };

  return (
    <div className={`time-picker ${className}`}>
      <div className="time-picker-input-show">
        <input
          type="text"
          className="time-picker-input"
          defaultValue={timeValue}
          onFocus={onFocusBlur}
          onBlur={onFocusBlur}
          placeholder={placeholder}
        />
        {showClearButton ? (
          <span
            className={`time-picker-input-clear ${
              timeValue ? "clear-button-show" : ""
            }`}
            onClick={clearInput}
          >
            x
          </span>
        ) : null}
      </div>
      {showPopup ? (
        <div className={`time-picker-popup ${animation} ${classNamePopup}`}>
          <TimePopup
            selectedTimeFun={selectedTimeFun}
            optionHeight={optionHeight}
            amount={amount}
            maxTime={23}
            defaultTime={defaultHoursTime}
            moduleName="hours"
          />
          <TimePopup
            selectedTimeFun={selectedTimeFun}
            optionHeight={optionHeight}
            amount={amount}
            maxTime={59}
            defaultTime={defaultMinutesTime}
            moduleName="minutes"
          />
          <TimePopup
            selectedTimeFun={selectedTimeFun}
            optionHeight={optionHeight}
            amount={amount}
            maxTime={59}
            defaultTime={defaultSecondsTime}
            moduleName="seconds"
          />
          <span className="time-picker-popup-main-sure" onClick={timeSure}>
            确定
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default TimePicker;
