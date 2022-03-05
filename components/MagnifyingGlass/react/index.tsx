/**
 * @todo Enlarge part of the image to display
 * @param {string} url
 * @param {HTMLElement} [children]
 * @param {String} [className]
 * @param {Object} [normalStyle={width:600}] Normal display image width and height
 *                                           Equal scale scaling,You must fill in either width or height
 * @param {CSSStyleRule} [maskLayerStyle={width:200}] The image shows the mask layer of the area
 * @param {Number} [multiple=2] The picture in the magnifying glass is several times larger than the original one
 * @function mouseEvent Mouse trigger event within the picture
 */
/**
 * @function mouseEvent
 * @type {String} [type]
 * @event event
 */

import "./index.css";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";

type Props = {
  url: string;
  children?: React.ReactNode;
  className?: string;
  normalStyle?: {
    width?: number;
    height?: number;
  };
  maskLayerStyle?: {
    width?: number;
    height?: number;
  };
  multiple?: number;
  mouseEvent?: (type?: string, event?: React.MouseEvent<HTMLElement>) => void;
};

const MagnifyingGlass: React.FC<Props> = (props) => {
  const magnifyingGlass = useRef<any>(null);
  const {
    url,
    children,
    className = "",
    multiple = 2,
    normalStyle = {
      width: 600,
    },
    maskLayerStyle = {
      width: 200,
    },
  } = props;

  const __maskLayerStyle = {
    width: (maskLayerStyle.width || maskLayerStyle.height) as number,
    height: (maskLayerStyle.height || maskLayerStyle.width) as number,
  };

  const __magnifyingStyle = {
    width: __maskLayerStyle.width * multiple,
    height: __maskLayerStyle.height * multiple,
  };

  const [showMagnifying, setShowMagnifying] = useState<boolean>(false);
  const [magnifyingImg, setMagnifyingImg] = useState<React.CSSProperties>();
  const [maskLayer, setMaskLayer] =
    useState<React.CSSProperties>(__maskLayerStyle);

  useLayoutEffect(() => {
    if (normalStyle && !normalStyle.width && !normalStyle.height) {
      throw new Error("normalStyle must contain either width or height");
    }
    if (maskLayerStyle && !maskLayerStyle.width && !maskLayerStyle.height) {
      throw new Error("maskLayerStyle must contain either width or height");
    }
  }, []);

  // Initialize the CSS parameters for the enlarged image
  useEffect(() => {
    const img: any = new Image();
    img.src = url;
    img.onload = img.onerror = () => {
      const { width, height } = normalStyle;
      const imgHeight =
        (height || ((width as number) / img.width) * img.height) * multiple;
      const imgWidth =
        (width || ((height as number) / img.height) * img.width) * multiple;
      setMagnifyingImg({
        width: imgWidth,
        height: imgHeight,
      });
    };
  }, []);

  const onMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    if (event.type === "mouseenter" || event.type === "mousemove") {
      setShowMagnifying(true);
      const location: any = (
        magnifyingGlass.current as HTMLElement
      ).getBoundingClientRect();
      const { width, height, top, left } = location;
      const { clientX, clientY } = event;
      const maskLayerWidth = __maskLayerStyle.width;
      const maskLayerHeight = __maskLayerStyle.height;
      let offsetY = Math.abs(Math.ceil(clientY - top)); // The position of the mouse in the element
      let offsetX = Math.abs(Math.ceil(clientX - left)); // The position of the mouse in the element
      if (offsetY < maskLayerHeight / 2) {
        offsetY = 0;
      } else if (offsetY > height - maskLayerHeight / 2) {
        offsetY = height - maskLayerHeight;
      } else {
        offsetY -= maskLayerHeight / 2;
      }
      if (offsetX < maskLayerWidth / 2) {
        offsetX = 0;
      } else if (offsetX > width - maskLayerWidth / 2) {
        offsetX = width - maskLayerWidth;
      } else {
        offsetX -= maskLayerWidth / 2;
      }
      setMagnifyingImg({
        ...magnifyingImg,
        ...{
          transform: `translate(-${offsetX * multiple}px,-${
            offsetY * multiple
          }px)`,
        },
      });
      setMaskLayer({
        ...maskLayer,
        ...{
          top: offsetY,
          left: offsetX,
        },
      });
    }
    if (event.type === "mouseleave") {
      setShowMagnifying(false);
    }
    if (props.mouseEvent) {
      props.mouseEvent(event.type, event);
    }
  };

  return (
    <div className={`magnifying-glass ${className}`}>
      <div
        className="magnifying-glass-normal"
        onMouseMove={onMouseEnter}
        onMouseEnter={onMouseEnter}
        onMouseOver={onMouseEnter}
        onMouseOut={onMouseEnter}
        onMouseLeave={onMouseEnter}
        ref={magnifyingGlass}
        style={normalStyle}
      >
        <img src={url} alt="" />
      </div>
      {children}
      <div
        className={`mask-layer`}
        style={maskLayer}
        onMouseMove={onMouseEnter}
        onMouseLeave={onMouseEnter}
      />
      {showMagnifying ? (
        <div className="magnifying-glass-magnifying" style={__magnifyingStyle}>
          <img src={url} alt="" style={magnifyingImg} />
        </div>
      ) : null}
    </div>
  );
};

export default MagnifyingGlass;
