// Sort in order

const sort = document.getElementById("sort");
const dom = document.createDocumentFragment();
let sortTimer = null;
const marginBottom = 10;
let browserWidth = 300;
if (sort.offsetWidth > 300) {
  browserWidth = sort.offsetWidth;
}
function GetRandomNum(min, max) {
  const Range = max - min;
  const Rand = Math.random();
  return min + Math.round(Rand * Range);
}
const masonryLayoutsWidth = GetRandomNum(100, 300);
function createElementFun() {
  const color = ["#f00", "#ff0", "#000", "#999", "#666"];
  for (let i = 0; i < 20; i++) {
    const colorNumber = GetRandomNum(0, 4);
    const provisionality = document.createElement("div");
    provisionality.innerText = `No.${i}-${colorNumber}`;
    provisionality.style.width = masonryLayoutsWidth + "px";
    provisionality.style.height = GetRandomNum(100, 300) + "px";
    provisionality.style.backgroundColor = color[colorNumber];
    provisionality.className = "masonry-Layouts";
    dom.appendChild(provisionality);
  }
}
function pubuFun() {
  const column = Math.floor(browserWidth / masonryLayoutsWidth);
  const pubuDom = document.querySelectorAll(".masonry-Layouts");
  const pubuLength = pubuDom.length;
  const line = Math.ceil(pubuLength / column);
  let remaining = 0;
  if (column > 1) {
    remaining = (browserWidth - masonryLayoutsWidth * column) / (column - 1);
  } else {
    remaining = browserWidth - masonryLayoutsWidth * column;
  }
  for (let j = 0; j < line; j++) {
    for (let i = j * column; i < (j + 1) * column; i++) {
      pubuDom[i].style.left = `${
        (masonryLayoutsWidth + remaining) * (i % column)
      }px`;
      if (j === 0) {
        pubuDom[i].style.top = 0;
      } else {
        pubuDom[i].style.top = `${
          pubuDom[i - column].offsetHeight +
          parseInt(pubuDom[i - column].style.top) +
          marginBottom
        }px`;
      }
    }
  }
}
createElementFun();
window.onload = () => {
  sort.appendChild(dom);
  pubuFun();
};
function antiShake(time) {
  clearTimeout(sortTimer);
  sortTimer = setTimeout(function () {
    pubuFun();
    clearTimeout(sortTimer);
    sortTimer = null;
  }, time);
}
function throttling(time) {
  if (sortTimer) {
    return;
  }
  sortTimer = setInterval(function () {
    pubuFun();
    clearInterval(sortTimer);
    sortTimer = null;
  }, time);
}
window.addEventListener("resize", () => {
  if (sort.offsetWidth > 300) {
    browserWidth = sort.offsetWidth;
    antiShake(1000);
    // throttling(1000);
  }
});
