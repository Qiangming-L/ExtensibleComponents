const _components = document.querySelector("#components");
const _directory = document.querySelector("#directory");
let _name = "ButtonAnimation";

_directory.onclick = function (event) {
  document.documentElement.scrollTop = 0;
  const _target = event.target;
  const _children = _directory.children;
  const Length = _children.length;

  for (let i = 0; i < Length; i++) {
    _children[i].className = "directory-option";
  }
  if (_target.className.includes("directory-option")) {
    _name = _target.innerText;
    _target.className = `directory-option choose-option`;
    _components.innerHTML = updateText();
  }
};

_components.innerHTML = updateText();
_directory.innerHTML = directoryText();

function directoryText() {
  const Lenth = components.length;
  let _element = "";
  for (let i = 0; i < Lenth; i++) {
    let _className = "directory-option";
    if (components[i] === _name) {
      _className = "directory-option choose-option";
    }
    _element += `<li class="${_className}">${components[i]}</li>`;
  }
  return _element;
}

function updateText(_arr = dataArr[_name], _dom = "") {
  const {
    title,
    text,
    tbody,
    codeSandboxReact,
    codeSandboxVue,
    special,
    chilren,
  } = _arr;
  let _element = "";
  _element += _dom;
  _element += `
  <h3 class="content-title">${title}</h3>
    <div class="content-body">
      <p class="content-text">${text}</p>
      <h4 class="content-props">Props</h4>
      <table class="content-table">
        <thead>
          <tr>
            <th>参数</th>
            <th>说明</th>
            <th>类型</th>
            <th>默认值</th>
          </tr>
        </thead>
        <tbody>
          ${tbodyFun(tbody)}
        </tbody>
      </table>
    `;
  if (codeSandboxReact) {
    _element += codeSandboxFun(codeSandboxReact);
  }
  if (codeSandboxVue) {
    _element += codeSandboxFun(codeSandboxReact, "vue");
  }
  if (special) {
    _element += `<p class="special-text">${special}</p>`;
  }
  _element += "</div>";
  if (chilren && chilren.length > 0) {
    const Length = chilren.length;
    for (let i = 0; i < Length; i++) {
      _element = updateText(chilren[i], _element);
    }
  }
  return _element;
}

function tbodyFun(tbody) {
  const Length = tbody.length;
  let _element = "";
  for (let i = 0; i < Length; i++) {
    _element += `<tr>
      <td>${tbody[i].propsName}</td>
      <td>${tbody[i].instructions}</td>
      <td>${tbody[i].type}</td>
      <td>${tbody[i].default}</td>
    </tr>`;
  }
  return _element;
}

function codeSandboxFun(url, type = "react") {
  const _element = `
    <div class="body-codeSandbox">
       <div class="body-codeSandbox-content">
            <svg
              t="1646549870371"
              class="icon codeSandbox-svg"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1545"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="30"
              height="30"
            >
              <defs><style type="text/css"></style></defs>
              <path
                d="M709.6 210l0.4-0.2h0.2L512 96 313.9 209.8h-0.2l0.7 0.3L151.5 304v416L512 928l360.5-208V304l-162.9-94zM482.7 843.6L339.6 761V621.4L210 547.8V372.9l272.7 157.3v313.4zM238.2 321.5l134.7-77.8 138.9 79.7 139.1-79.9 135.2 78-273.9 158-274-158zM814 548.3l-128.8 73.1v139.1l-143.9 83V530.4L814 373.1v175.2z"
                p-id="1546"
              ></path>
            </svg>
            <a
              href="${url}"
              target="view_window"
              class="codeSandbox-link"
              id="codeSandboxTLinkReact"
            ></a>
            <div class="codeSandbox-popup triangle">${
              type === "react" ? "CodeSandbox-React" : "CodeSandbox-Vue"
            }</div>
        </div>
    </div>
    `;
  return _element;
}
