const notSort = document.getElementById("notSort");
const dom = document.createDocumentFragment();
let notSortTimer = null;
const marginBottom = 10;
let browserWidth = 300;
if (notSort.offsetWidth > 300) {
  browserWidth = notSort.offsetWidth;
}
function GetRandomNum(min, max) {
  const Range = max - min;
  const Rand = Math.random();
  return min + Math.round(Rand * Range);
}
const masonryLayoutsWidth = GetRandomNum(100, 300);
function createElementFun() {
  const color = ["#f00", "#ff0", "#000", "#999", "#666"];
  for (let i = 0; i < 100; i++) {
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
  const pubuDom = document.querySelectorAll(".masonry-Layouts");
  const pubuLength = pubuDom.length;
  const column = Math.floor(browserWidth / masonryLayoutsWidth);
  const smallestArr = [];
  let smallestIndex = [0, pubuDom[0].offsetHeight + marginBottom];
  let remaining = 0;
  if (column > 1) {
    remaining = (browserWidth - masonryLayoutsWidth * column) / (column - 1);
  } else {
    remaining = browserWidth - masonryLayoutsWidth * column;
  }
  const line = Math.ceil(pubuLength / column);
  for (let i = 0; i < column; i++) {
    pubuDom[i].style.top = 0;
    pubuDom[i].style.left = `${i * (masonryLayoutsWidth + remaining)}px`;
    smallestArr.push(pubuDom[i].offsetHeight);
    if (pubuDom[i].offsetHeight + marginBottom < smallestIndex[1]) {
      smallestIndex = [i, pubuDom[i].offsetHeight + marginBottom];
    }
  }
  for (let j = column; j < pubuLength; j++) {
    smallestArr[smallestIndex[0]] += pubuDom[j].offsetHeight + marginBottom;
    pubuDom[j].style.opacity = 1;
    pubuDom[j].style.top = `${smallestIndex[1]}px`;
    pubuDom[j].style.left = `${
      smallestIndex[0] * (masonryLayoutsWidth + remaining)
    }px`;
    smallestIndex[1] +=
      smallestIndex[1] + pubuDom[j].offsetHeight + marginBottom;
    for (let i = 0; i < smallestArr.length; i++) {
      if (smallestArr[i] + marginBottom < smallestIndex[1]) {
        smallestIndex = [i, smallestArr[i] + marginBottom];
      }
    }
  }
}
createElementFun();
window.onload = function () {
  notSort.appendChild(dom);
  pubuFun();
};
function antiShake(time) {
  clearTimeout(notSortTimer);
  notSortTimer = setTimeout(function () {
    pubuFun();
    clearTimeout(notSortTimer);
    notSortTimer = null;
  }, time);
}
function throttling(time) {
  if (notSortTimer) {
    return;
  }
  notSortTimer = setTimeout(function () {
    pubuFun();
    clearTimeout(notSortTimer);
    notSortTimer = null;
  }, time);
}
window.addEventListener("resize", function () {
  if (notSort.offsetWidth > 300) {
    browserWidth = notSort.offsetWidth;
    // antiShake(1000);
    throttling(2000);
  }
});
