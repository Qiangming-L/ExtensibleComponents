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
    reference,
    tbody,
    codeSandboxReact,
    githubReact,
    codeSandboxVue,
    githubVue,
    special,
    chilren,
  } = _arr;
  let _element = "";
  _element += _dom;
  _element += `
  <h3 class="content-title">${title}</h3>
    <div class="content-body">
      <p class="content-text">${text}</p>
      ${reference ? referenceFun(reference) : ""}
      ${tbody ? tbodyFun(tbody) : ""}
    `;
  if (codeSandboxReact || githubReact) {
    _element += `<div class="body-codeSandbox">
    <span>React:</span>
    ${
      codeSandboxReact
        ? codeSandboxFun(codeSandboxReact, "react", "codeSandbox")
        : ""
    }
    ${githubReact ? codeSandboxFun(githubReact) : ""}
    </div>`;
  }
  if (codeSandboxVue || githubVue) {
    _element += `<div class="body-codeSandbox">
    <span>Vue:</span>
    ${
      codeSandboxVue ? codeSandboxFun(codeSandboxVue, "vue", "codeSandbox") : ""
    }
    ${githubVue ? codeSandboxFun(githubVue, "vue") : ""}
    </div>`;
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

function referenceFun(data) {
  const _element = `
    <div class="special-text">${data}</div>
  `;
  return _element;
}

function tbodyFun(tbody) {
  const Length = tbody.length;
  let _element = `
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
    `;
  for (let i = 0; i < Length; i++) {
    _element += `<tr>
      <td>${tbody[i].propsName}</td>
      <td>${tbody[i].instructions}</td>
      <td>${tbody[i].type}</td>
      <td>${tbody[i].default}</td>
    </tr>`;
  }
  _element += "</tbody></table>";
  return _element;
}

function codeSandboxFun(url, type = "react", website = "github") {
  const _element = `
       <div class="body-codeSandbox-content">
            ${
              website === "codeSandbox"
                ? `
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
            </svg>`
                : `
            <svg t="1646630344710" class="icon codeSandbox-svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2013" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M512 42.666667A464.64 464.64 0 0 0 42.666667 502.186667 460.373333 460.373333 0 0 0 363.52 938.666667c23.466667 4.266667 32-9.813333 32-22.186667v-78.08c-130.56 27.733333-158.293333-61.44-158.293333-61.44a122.026667 122.026667 0 0 0-52.053334-67.413333c-42.666667-28.16 3.413333-27.733333 3.413334-27.733334a98.56 98.56 0 0 1 71.68 47.36 101.12 101.12 0 0 0 136.533333 37.973334 99.413333 99.413333 0 0 1 29.866667-61.44c-104.106667-11.52-213.333333-50.773333-213.333334-226.986667a177.066667 177.066667 0 0 1 47.36-124.16 161.28 161.28 0 0 1 4.693334-121.173333s39.68-12.373333 128 46.933333a455.68 455.68 0 0 1 234.666666 0c89.6-59.306667 128-46.933333 128-46.933333a161.28 161.28 0 0 1 4.693334 121.173333A177.066667 177.066667 0 0 1 810.666667 477.866667c0 176.64-110.08 215.466667-213.333334 226.986666a106.666667 106.666667 0 0 1 32 85.333334v125.866666c0 14.933333 8.533333 26.88 32 22.186667A460.8 460.8 0 0 0 981.333333 502.186667 464.64 464.64 0 0 0 512 42.666667" p-id="2014"></path></svg>
            `
            }
            <a
              href="${url}"
              target="view_window"
              class="codeSandbox-link"
              id="codeSandboxTLinkReact"
            ></a>
        </div>
    `;
  return _element;
}
