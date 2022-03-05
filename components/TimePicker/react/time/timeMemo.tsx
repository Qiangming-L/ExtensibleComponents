import React, { useRef, useEffect } from "react";

type Props = {
  showArr: Array<DataShow>;
  currentTime: number | string;
  amount?: number;
  optionHeight?: number;
  ref?: any;
  style?: React.CSSProperties;
  onScroll?: (event: React.WheelEvent<HTMLDivElement>) => void;
};
type DataShow = {
  value: string | number;
  key?: string | number;
};

const TimeMemo: React.FC<Props> = (props) => {
  const scroll: any = useRef(null);

  const {
    showArr,
    currentTime,
    onScroll,
    style,
    amount = 7,
    optionHeight = 30,
  } = props;

  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollTop = 1;
    }
  }, []);

  const onWheelFun = (event: React.WheelEvent<HTMLDivElement>) => {
    if (onScroll) {
      onScroll(event);
    }
  };
  const onScrollFun = (event: React.WheelEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    target.scrollTop = 1;
  };

  const textShow = (value: string | number): string => {
    if (value.toString().length === 1) {
      return `0${value}`;
    }
    return value.toString();
  };

  return (
    <div className={`time-picker-popup-select`}>
      <div
        className={`time-picker-scroll-hidden `}
        onWheel={onWheelFun}
        onScroll={onScrollFun}
        ref={scroll}
        style={{ height: amount * optionHeight }}
      >
        <div className="time-picker-scroll" style={style}>
          {showArr?.map((item) => {
            return (
              <span
                data-data={item.value}
                key={`option-${item.key}`}
                className={`time-picker-popup-option  ${
                  Number(item) === Number(currentTime) ? "choose-time" : ""
                }`}
              >
                {textShow(item.value)}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default React.memo(TimeMemo);
