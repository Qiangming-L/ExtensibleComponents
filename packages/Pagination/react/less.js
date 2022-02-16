import React from "react";

function Less(props) {
  const { pagesArr, chooseNumber } = props;
  return (
    <React.Fragment>
      {pagesArr.map(number => (
        <li
          className={chooseNumber === number ? "choose-page" : null}
          key={number}
          onClick={event => props.changeNumber(number, props.performFun, event)}
        >
          {number}
        </li>
      ))}
    </React.Fragment>
  );
}

export default Less;
