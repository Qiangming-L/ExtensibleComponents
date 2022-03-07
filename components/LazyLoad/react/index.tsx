/**
 * Using IntersectionObserver
 * @todo lazy loading of images
 * @param {Boolean} [showImg=false] whether to display the image directly
 * @param {String} [defaultImg] Lazy loading shows images by default
 * @requires defaultImg module:"../img/default.gif"
 * @param {String} [className]
 * @param {CSSStyleRule} data
 * @param {HTMLElement} [children]
 */
/**
 * LazyLoadData
 * @param { Boolean} [showImg=false] whether to display the image directly
 * @param { Number} [number] index of the current data
 */
import React from "react";

type LazyLoadData = {
  url: string;
  imgWidth?: number | string;
  imgHeight?: number | string;
  showImg?: boolean;
  number?: number;
};

type Props = {
  defaultImg?: string;
  className?: string;
  data: LazyLoadData;
  children?: React.ReactNode;
  threshold?: number;
};

const LazyLoad: React.FC<Props> = (props) => {
  const {
    defaultImg = require("../img/default.gif"),
    threshold = 0.01,
    className = "",
    children,
    data,
  } = props;
  const { url, imgWidth, imgHeight, showImg = false, number, ...style } = data;

  const imgObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((item) => {
        if (item.intersectionRatio <= 0) return;
        const target: any = item.target;
        target.src = target.dataset.src;
        imgObserver.unobserve(item.target);
      });
    },
    {
      threshold: [threshold],
    }
  );
  const imgLazyLoad = (event: any): void => {
    event.target.src = defaultImg;
    imgObserver.observe(event.target);
  };

  return (
    <div
      className={`masonry-layouts-list ${className}`}
      style={style || undefined}
    >
      <img
        src={showImg ? url : ""}
        data-src={url}
        alt=""
        onError={imgLazyLoad}
      />
      {children}
    </div>
  );
};
export default LazyLoad;
