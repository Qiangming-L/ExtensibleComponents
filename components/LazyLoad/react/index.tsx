import React from "react";

type LazyLoadData = {
  url: string;
  imgWidth?: number | string;
  imgHeight?: number | string;
  showImg?: boolean; // default => false
  number?: number;
};

type Props = {
  showImg?: boolean; // Whether to display the image directly
  defaultImg?: string; // default => require("../img/default.gif")
  className?: string; // default => masonry-layouts-list
  data: LazyLoadData;
  children?: React.ReactNode;
  onClick?: (data: any, event: React.MouseEvent<HTMLElement>) => void;
};

const LazyLoad: React.FC<Props> = (props) => {
  const {
    defaultImg = require("../img/default.gif"),
    className = "masonry-layouts-list",
    children,
    data,
    onClick,
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
      threshold: [0.01],
    }
  );
  const imgLazyLoad = (event: any): void => {
    event.target.src = defaultImg;
    imgObserver.observe(event.target);
  };

  return (
    <div
      className={className}
      style={style || undefined}
      onClick={onClick ? (event) => onClick(data, event) : undefined}
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
