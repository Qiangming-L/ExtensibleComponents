/**
 * @param {Boolean} [isImmediately=false] Whether to enable animation on first load
 * @param {String} [className]
 * @param {String} [childClassName]
 * @param {HTMLElement} children
 * @param {CSSStyleRule} [style]
 * @param {Number} [time=500] Timer events 'modify the event needs to be synchronized to modify the CSS "transition" events'
 * @function parentOnClick
 * @param {CSSStyleRule} [magnifyingEndStyle={width: "100%",height: "100%",top: 0,left: 0,backgroundColor: " rgba(0, 0, 0, 0.5)", }] Animation final style
 */

import "./index.css";
import React, { useState, useEffect, useRef } from "react";

type Style = {
  width?: number | string;
  height?: number | string;
  top?: number | string;
  left?: number | string;
  backgroundColor?: string;
};

interface Props {
  isImmediately?: boolean;
  className?: string;
  childClassName?: string;
  children: React.ReactNode;
  style?: Style;
  time?: number;
  parentOnClick?: () => void;
  magnifyingEndStyle?: Style;
}

const MagnifyingView: React.FC<Props> = (props) => {
  const magnifyingView: any = useRef(null);
  const timer: any = useRef(null);
  const {
    className,
    childClassName,
    children,
    style,
    time = 500,
    isImmediately = false,
    parentOnClick,
    magnifyingEndStyle = {
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      backgroundColor: " rgba(0, 0, 0, 0.5)",
    },
  } = props;

  const [modificationStyle, setModificationStyle] = useState<
    Style | undefined
  >();
  const [endAnimation, setEndAnimation] = useState<Style | undefined>(
    undefined
  );
  const [immediately, setImmediately] = useState<boolean>(isImmediately);
  const [isAnimation, setIsAnimation] = useState<string>("");

  useEffect(() => {
    if (isImmediately) {
      const { left, top, width, height } = style || {};
      if (left && top && width && height) {
        setIsAnimation("magnifying-view-animation");
        animationFun();
      } else {
        throw new Error(
          "When you enable 'isImmediately', the style must have 'left/top/width/height'"
        );
      }
    }
    return () => {
      clearTimeout(timer.current);
      timer.current = null;
    };
  }, []);

  useEffect(() => {
    if (isAnimation === "magnifying-view-animation") {
      setEndAnimation(magnifyingEndStyle);
    } else if (isAnimation === "magnifying-view-unanimation") {
      setEndAnimation(modificationStyle);
    }
  }, [isAnimation]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    animationFun();
  };

  const animationFun = (event?: React.MouseEvent<HTMLElement>) => {
    const location: any = magnifyingView.current.getBoundingClientRect();
    if (
      isAnimation === "magnifying-view-unanimation" ||
      immediately ||
      !isAnimation
    ) {
      setIsAnimation("magnifying-view-animation");
      setImmediately(false);
      if (immediately) {
        setModificationStyle(style);
      } else {
        setModificationStyle({
          top: location.top,
          left: location.left,
        });
      }
    } else if (isAnimation === "magnifying-view-animation" && !immediately) {
      setIsAnimation("magnifying-view-unanimation");
      timer.current = timeout(() => {
        setIsAnimation("");
        if (parentOnClick) {
          parentOnClick();
        }
        clearTimeout(timer.current);
        timer.current = null;
      }, time);
    }
  };

  return (
    <div
      className={`magnifying-view ${isAnimation} ${className || ""}`}
      onClick={(event) => handleClick(event)}
      style={{ ...style, ...modificationStyle, ...endAnimation }}
    >
      <div
        className={`magnifying-view-content ${childClassName || ""}`}
        ref={magnifyingView}
      >
        {children}
      </div>
    </div>
  );
};

export default MagnifyingView;
