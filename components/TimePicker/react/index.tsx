import "./index.css";
import React, { useState, useRef, useCallback, useEffect } from "react";

import TimePopup from "./time";

type Props = {
  className?: string;
  classNamePopup?: string;
  showClearButton?: boolean;
  placeholder?: string;
  optionHeight?: number;
  amount?: number;
};

const TimePicker: React.FC<Props> = (props) => {
  const timer: any = useRef(null);
  const {
    className = "",
    classNamePopup = "",
    showClearButton = true,
    placeholder = "请选择时间",
    optionHeight = 30,
    amount = 11,
  } = props;

  const [timeValue, setTimeValue] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [animation, setAnimation] = useState<string>("");

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
        setAnimation("animation");
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
    setAnimation("unanimation");
    window.removeEventListener("click", lstenerClick);
    timer.current = setTimeout(() => {
      setShowPopup(false);
      clearTimerFun();
    }, 100);
  };
  const onSureClick = (data: string) => {
    setTimeValue(data);
    closePopup();
  };
  const clearInput = () => {
    setTimeValue("");
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
            onSureClick={onSureClick}
            optionHeight={optionHeight}
            amount={amount}
          />
        </div>
      ) : null}
    </div>
  );
};

export default TimePicker;
