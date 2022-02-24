import React, { useState, useEffect, useRef } from "react";

import "./index.css";

type Style = {
  width?: number | string;
  height?: number | string;
  top?: number | string;
  left?: number | string;
  backgroundColor?: string;
};

interface Props {
  isImmediately?: boolean; // default => false (Whether to enable animation on first load)
  className?: string;
  childClassName?: string;
  children?: React.ReactNode;
  style?: Style;
  setTime?: number; // default => 500 (Timer events 'modify the event needs to be synchronized to modify the CSS "transition" events')
  parentOnClick?: () => void;
  magnifyingEndStyle?: Style; // default => {width: "100%",height: "100%",top: 0,left: 0,backgroundColor: " rgba(0, 0, 0, 0.5)", } (Animation final style)
}

const MagnifyingView: React.FC<Props> = (props) => {
  const magnifyingView: any = useRef(null);
  const timer: any = useRef(null);
  const {
    className,
    childClassName,
    children,
    style,
    setTime = 500,
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
        setIsAnimation("animation");
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
    if (isAnimation === "animation") {
      setEndAnimation(magnifyingEndStyle);
    } else if (isAnimation === "unanimation") {
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
    if (isAnimation === "unanimation" || immediately || !isAnimation) {
      setIsAnimation("animation");
      setImmediately(false);
      if (immediately) {
        setModificationStyle(style);
      } else {
        setModificationStyle({
          top: location.top,
          left: location.left,
        });
      }
    } else if (isAnimation === "animation" && !immediately) {
      setIsAnimation("unanimation");
      timer.current = setTimeout(() => {
        setIsAnimation("");
        if (parentOnClick) {
          parentOnClick();
        }
        clearTimeout(timer.current);
        timer.current = null;
      }, setTime);
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
