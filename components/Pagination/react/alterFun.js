import React from "react";

function AlterFun(props) {
  return (
    <div
      className={`eble-alter ${props.alterBool ? "eble-alter-display" : null}`}
    >
      <svg
        t="1553238219192"
        className="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1152"
        width="40"
        height="40"
      >
        <defs>
          <style type="text/css" />
        </defs>
        <path
          d="M512 139.636364L81.454545 884.363636h863.418182L512 139.636364z m37.236364 307.2l-9.309091 242.036363h-58.181818l-9.309091-242.036363h76.8z m-34.909091 356.072727c-13.963636 0-25.6-4.654545-32.581818-11.636364-9.309091-6.981818-11.636364-16.290909-11.636364-27.927272s4.654545-20.945455 11.636364-27.927273c9.309091-6.981818 18.618182-11.636364 30.254545-11.636364s23.272727 4.654545 30.254545 11.636364c6.981818 6.981818 11.636364 16.290909 11.636364 27.927273s-4.654545 20.945455-11.636364 27.927272c-6.981818 9.309091-16.290909 11.636364-27.927272 11.636364z"
          fill="#f4ea2a"
          p-id="1153"
        />
      </svg>
      <p>{props.alterText}</p>
      <button onClick={props.closeAlter}>Sure</button>
    </div>
  );
}

export default AlterFun;
