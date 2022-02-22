import React from "react";

interface Style {
  top?: number;
  left?: number;
  width?: number;
  marginBottom?: number;
  height?: number;
  opacity?: number;
}

interface Props {
  url?: string;
  showImg?: boolean;
  index?: number;
  defaultImg?: string;
  className?: string;
  children?: React.ReactElement;
  style?: Style;
}

const LazyLoad: React.FC<Props> = (props) => {
  const {
    url,
    showImg,
    index,
    defaultImg = require("../img/default.gif"),
    className,
    children,
    style,
  } = props;

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
    imgObserver.observe(event.target);
  };

  return (
    <div
      className={`masonry-layouts-list ${className || ""}`}
      style={style || undefined}
    >
      <img src={defaultImg} data-src={url} alt="" onLoad={imgLazyLoad} />
      {children}
    </div>
  );
};
export default LazyLoad;
