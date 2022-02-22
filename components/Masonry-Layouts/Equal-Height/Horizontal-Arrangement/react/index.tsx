import React, { useState, useEffect, useRef } from "react";

import "./index.css";

import LazyLoad from "../LazyLoad";
import { antiShake } from "../compents/antiShake";

interface PropsStyle {
  height: number; // Image height
  marginBottom?: number; // Images margin
  marginRight?: number; // Images margin
}
interface Style {
  width?: number; // Image width
}
interface Other {
  number?: number; // sort
  showImg?: boolean; // Scroll bar Lazy-Load
  imgWidth?: boolean; // Img original width
  imgHeight?: boolean; // Img original height
}
interface MasonryLayoutsArray {
  url: string;
}

interface Props {
  masonryLayoutsArray: Array<MasonryLayoutsArray | any>;
  masonryLayoutsStyle?: PropsStyle;
  minDifference?: number; // Minimum gap between screen and element
  minWidth?: number; // The minimum width of the element
  className?: string;
}

const MasonryLayouts: React.FC<Props> = (props) => {
  const masonryLayouts: any = useRef(null);
  const masonryLayoutsHeight = document.documentElement.clientHeight;

  const {
    masonryLayoutsArray,
    className,
    masonryLayoutsStyle = {
      height: 100,
      marginBottom: 20,
      marginRight: 20,
    },
    minDifference = -50,
    minWidth = 300,
  } = props;

  const [masonryLayoutsWidth, setMasonryLayoutsWidth] = useState<number>(
    document.body.clientWidth
  );
  const [imgUrlArray, setImgUrlArray] = useState<
    Array<Style & PropsStyle & Other>
  >([]);

  // Initialization Data and listen for browser width changes
  useEffect(() => {
    const provisionalityUrl: Array<any> = [];
    const Length = masonryLayoutsArray.length;
    for (let i = 0; i < Length; i++) {
      const img = new Image();
      img.src = masonryLayoutsArray[i].url;
      img.onload = img.onerror = () => {
        const { height, marginBottom, marginRight } = masonryLayoutsStyle;
        const width = Math.round((height / img.height) * img.width);
        provisionalityUrl.push({
          url: masonryLayoutsArray[i].url,
          height,
          width,
          imgHeight: img.height,
          imgWidth: img.width,
          showImg: false,
          number: i,
          marginBottom,
          marginRight,
        });
        if (provisionalityUrl.length === Length) {
          const provisionalitySort = provisionalityUrl.sort(
            (a, b) => a.number - b.number
          );
          masonryLayoutsListFun(provisionalitySort);
        }
      };
    }
    setMasonryLayoutsWidth(masonryLayouts.current.clientWidth);
    window.addEventListener("resize", changeFun);
    return () => {
      window.removeEventListener("resize", changeFun);
    };
  }, []);

  useEffect(() => {
    masonryLayoutsListFun();
  }, [masonryLayoutsWidth]);

  // Detect screen width changes
  const changeFun = () => {
    const { clientWidth = 0 } = masonryLayouts.current;
    if (clientWidth >= minWidth) {
      antiShake(() => {
        setMasonryLayoutsWidth(masonryLayouts.current.clientWidth);
      });
    }
  };
  // Initialization Data
  const masonryLayoutsListFun = (
    referenceData: Array<any> = imgUrlArray
  ): void => {
    if (referenceData.length > 0) {
      const provisionalityArray = [...[], ...referenceData];
      const Length = provisionalityArray.length;
      const masonryLayoutsWidth: number = masonryLayouts.current.clientWidth;
      const { marginRight = 0 } = masonryLayoutsStyle;
      // Record the start and end values of index for the current row
      let rowIndex = [0, 0];
      // Calculates the total width of the current row
      let rowWidth = 0;
      for (let i = 0; i < Length; i++) {
        rowWidth += provisionalityArray[i].width + marginRight;
        if (minDifference <= rowWidth - masonryLayoutsWidth) {
          rowIndex = [rowIndex[1] === 0 ? 0 : rowIndex[1] + 1, i];
          const elementDifference = Math.round(
            (rowWidth - masonryLayoutsWidth - marginRight) /
              (rowIndex[1] - rowIndex[0])
          );
          rowWidth = 0;
          // Records the modified total element width for this row
          let currentRow = (rowIndex[1] - rowIndex[0]) * marginRight;
          for (let j = rowIndex[0]; j <= i; j++) {
            currentRow += provisionalityArray[j].width - elementDifference;
            // marginRight is 0 on the last element of this line
            if (j === i) {
              provisionalityArray[j].marginRight = 0;
            }
            if (currentRow <= masonryLayoutsWidth) {
              if (j === i) {
                const number = currentRow - masonryLayoutsWidth + 2; // + 2 is fault tolerance
                provisionalityArray[j].width -= elementDifference + number;
              } else {
                provisionalityArray[j].width -= elementDifference;
              }
            } else {
              const number = currentRow - masonryLayoutsWidth + 2; // + 2 is fault tolerance
              provisionalityArray[j].width -= elementDifference + number;
            }
          }
        }
      }
      setImgUrlArray(provisionalityArray);
    }
  };

  return (
    <div
      className={`masonry-layouts ${className || ""}`}
      ref={masonryLayouts}
      style={{
        height: masonryLayoutsHeight || 500,
      }}
    >
      {imgUrlArray.map((item: any, index: number) => {
        const { url, showImg, number, ...style } = item;
        return (
          <LazyLoad
            url={url}
            key={`masonry-layouts-${index}`}
            style={style}
            index={index}
          />
        );
      })}
    </div>
  );
};

export default MasonryLayouts;
