/**
 * @todo Equal-width picture display effect
 * @param {Array} masonryLayoutsArray Show the picture
 * @param {CSSStyleRule} [masonryLayoutsStyle]
 * @param {Number} [minWidth=300] The minimum width of the element
 * @param {String} [className]
 *
 */

import "./index.css";
import React, { useState, useEffect, useRef } from "react";

/**
 * @requires module:LazyLoad
 */
import LazyLoad from "../../../../LazyLoad/react";
/**
 * @requires module:mixins/antiShake
 */
import { antiShake } from "../../../../../mixins/antiShake";

interface PropsStyle {
  width?: number | string; // Image width
  marginBottom?: number; // Images margin
}
interface Style {
  top: number;
  left: number;
  height?: number;
  opacity?: number;
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
  minWidth?: number;
  className?: string;
}

const MasonryLayouts: React.FC<Props> = (props) => {
  const masonryLayouts: any = useRef(null);
  const masonryLayoutsHeight = document.documentElement.clientHeight;

  const {
    className,
    minWidth = 300,
    masonryLayoutsStyle = {
      width: minWidth,
      marginBottom: 10,
    },
    masonryLayoutsArray,
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
        provisionalityUrl.push({
          url: masonryLayoutsArray[i].url,
          number: i,
          showImg: false,
          imgWidth: img.width,
          imgHeight: img.height,
        });
        // onError is not triggered sequentially
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

  // useEffect(() => {
  //   if (masonryLayouts.current && masonryLayouts.current.children.length > 0) {
  //     masonryLayoutsListFun();
  //   }
  // }, [masonryLayouts.current]);

  // Detect screen width changes
  const changeFun = (): void => {
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
      const childrenElement = masonryLayouts.current.children;
      const { width = minWidth, marginBottom = 0 } = masonryLayoutsStyle;
      // Calculate picture width
      let childWidth: number = 0;
      // You can use the percentagesNumbers function in mixins instead
      const widthTypeOf = typeof masonryLayoutsStyle.width;
      if (widthTypeOf === "string") {
        if (width.toString().indexOf("%") > -1) {
          if (Number.isNaN(parseInt(width.toString()))) {
            throw new Error("width can only be a percentage or a number");
          } else {
            childWidth =
              (parseInt(width.toString()) / 100) * masonryLayoutsWidth;
          }
        } else if (Number.isNaN(Number(width))) {
          throw new Error("width can only be a percentage or a number");
        } else {
          childWidth = Number(width);
        }
      } else {
        childWidth = Number(width);
      }
      // Height of all elements in each column
      let smallestArr: Array<number> = [];
      // The margins between images
      let mlMarginRight: number = 0;
      // smallestArr minimum number and index [index, height]
      let smallestIndex: Array<number> = [
        0,
        (childWidth / provisionalityArray[0].imgWidth) *
          provisionalityArray[0].imgHeight +
          marginBottom,
      ];
      // gets the height of all sibling elements except img
      // if (childrenElement.length > 0) {
      //   smallestIndex[1] += childrenElement[0].children[1].clientHeight;
      // }
      // picture the number of columns
      const provisionalityMlColumn: number = Math.floor(
        masonryLayoutsWidth / childWidth
      );
      if (provisionalityMlColumn > 1) {
        mlMarginRight =
          (masonryLayoutsWidth - childWidth * provisionalityMlColumn) /
          (provisionalityMlColumn - 1);
      } else {
        mlMarginRight =
          masonryLayoutsWidth - childWidth * provisionalityMlColumn;
      }
      // calculate attribute => top/left/hight
      for (let i = 0; i < Length; i++) {
        const provisionalityData = provisionalityArray[i];
        provisionalityData.width = childWidth;
        let otherheight: number = marginBottom;
        // gets the height of all sibling elements except img
        // if (childrenElement.length > 0) {
        //   otherheight += childrenElement[i].children[1].clientHeight;
        // }
        const mlHeight =
          (childWidth / provisionalityData.imgWidth) *
          provisionalityData.imgHeight;
        if (i < provisionalityMlColumn) {
          provisionalityData.top = 0;
          provisionalityData.left = i * (childWidth + mlMarginRight);
          provisionalityData.height = mlHeight;
          smallestArr[i] = mlHeight;
          if (mlHeight + otherheight < smallestIndex[1]) {
            smallestIndex = [...[], ...[i, mlHeight + otherheight]];
          }
        } else {
          const index: number = smallestIndex[0];
          smallestArr[index] += mlHeight + otherheight;
          provisionalityData.top = smallestIndex[1];
          provisionalityData.left = index * (childWidth + mlMarginRight);
          provisionalityData.height = mlHeight;
          smallestIndex = [
            ...[],
            ...[index, smallestIndex[1] + mlHeight + otherheight],
          ];
          for (let j = 0; j < smallestArr.length; j++) {
            if (smallestArr[j] + otherheight < smallestIndex[1]) {
              smallestIndex = [...[], ...[j, smallestArr[j] + otherheight]];
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
        return <LazyLoad key={`masonry-layouts-${index}`} data={item} />;
      })}
    </div>
  );
};

export default MasonryLayouts;
