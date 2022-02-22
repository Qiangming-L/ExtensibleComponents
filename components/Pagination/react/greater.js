import React from "react";

function Greater(props) {
  const { pagesNumber, chooseNumber } = props;
  let temporaryNumber = chooseNumber;
  let middleNumberArr = [];
  if (chooseNumber <= 5) {
    temporaryNumber = 5;
  } else if (chooseNumber >= pagesNumber - 4) {
    temporaryNumber = pagesNumber - 4;
  }
  for (let i = temporaryNumber - 2; i <= temporaryNumber + 2; i += 1) {
    middleNumberArr.push(i);
  }
  return (
    <React.Fragment>
      <li
        className={chooseNumber === 1 ? "choose-page" : null}
        onClick={event => props.changeNumber(1, props.performFun, event)}
      >
        1
      </li>
      {chooseNumber <= 4 ? (
        <li
          className={chooseNumber === 2 ? "choose-page" : null}
          onClick={event => props.changeNumber(2, props.performFun, event)}
        >
          2
        </li>
      ) : (
        <li className="eble-page-omit">...</li>
      )}
      {middleNumberArr.map(number => (
        <li
          key={number}
          className={chooseNumber === number ? "choose-page" : null}
          onClick={event => props.changeNumber(number, props.performFun, event)}
        >
          {number}
        </li>
      ))}
      {chooseNumber >= pagesNumber - 4 ? (
        <li
          className={chooseNumber === pagesNumber - 1 ? "choose-page" : null}
          onClick={event =>
            props.changeNumber(pagesNumber - 1, props.performFun, event)
          }
        >
          {pagesNumber - 1}
        </li>
      ) : (
        <li className="eble-page-omit">...</li>
      )}
      <li
        className={chooseNumber === pagesNumber ? "choose-page" : null}
        onClick={event =>
          props.changeNumber(pagesNumber, props.performFun, event)
        }
      >
        {pagesNumber}
      </li>
    </React.Fragment>
  );
}

export default Greater;
