const domDiv = document.getElementById("domDiv");
const domDivWidth = domDiv.offsetWidth;
const color = ["#f00", "#ff0", "#000", "#999", "#666"];
const marginBottom = 10;
function GetRandomNum(min, max) {
  const Range = max - min;
  const Rand = Math.random();
  return min + Math.round(Rand * Range);
}
const width = GetRandomNum(100, 300);
const column = Math.floor(domDivWidth / width);
const remaining = (domDivWidth - width * column) / (column - 1);
const dom = document.createDocumentFragment();
for (let i = 0; i < 20; i++) {
  const colorNumber = GetRandomNum(0, 4);
  const abc = document.createElement("div");
  abc.innerText = `No.${i}-${colorNumber}`;
  abc.style.width = width + "px";
  abc.style.height = GetRandomNum(100, 300) + "px";
  abc.style.display = "none";
  abc.style.backgroundColor = color[colorNumber];
  abc.className = "pubuliu";
  dom.appendChild(abc);
}
domDiv.appendChild(dom);
window.onload = () => {
  pubuFun();
};
function pubuFun() {
  const pubuDom = document.querySelectorAll(".pubuliu");
  const pubuLength = pubuDom.length;
  const line = Math.ceil(pubuLength / column);
  for (let j = 0; j < line; j++) {
    for (let i = j * column; i < (j + 1) * column; i++) {
      pubuDom[i].style.display = "block";
      pubuDom[i].style.left = `${(width + remaining) * (i % column)}px`;
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
