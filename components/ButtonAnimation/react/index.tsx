/**
 * @todo button click animation
 * @param {HTMLElement} [children]
 */
import "./index.css";
import React, { useState, useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
};

const ButtonAnimation: React.FC<Props> = (props) => {
  const timer: any = useRef(null);

  const { children } = props;

  const [showMask, setShowMask] = useState<boolean>(false);
  const [maskStyle, setMaskStyle] = useState<React.CSSProperties>();
  const [animation, setAnimation] = useState<string>("");

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
      timer.current = null;
    };
  }, []);

  useEffect(() => {
    if (showMask) {
      setAnimation("button-animation");
      // clear animation
      // To change the setTimeout execution time,
      // You need to change the transition execution time in the CSS (.button-animation-module-mask)
      timer.current = setTimeout(() => {
        setShowMask(false);
        setMaskStyle({});
        setAnimation("");
        clearTimeout(timer.current);
        timer.current = null;
      }, 400);
    }
  }, [showMask]);

  const maskStyleFun = (location: any): void => {
    setMaskStyle({
      top: location.top,
      left: location.left,
    });
  };

  const onClickFun = (event: React.MouseEvent<HTMLDivElement>) => {
    const tatget = event.target as HTMLDivElement;
    const location = tatget.getBoundingClientRect();
    const { top, left } = location;
    const coordinates = {
      left: event.clientX - left,
      top: event.clientY - top,
    };
    maskStyleFun(coordinates);
    setShowMask(true);
  };

  return (
    <React.Fragment>
      {children ? (
        <div className="button-animation-module" onClick={onClickFun}>
          {children}
          {showMask ? (
            <span
              className={`button-animation-module-mask ${animation}`}
              style={maskStyle}
            />
          ) : null}
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default ButtonAnimation;
