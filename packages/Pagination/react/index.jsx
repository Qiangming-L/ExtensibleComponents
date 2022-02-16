import React, { Component } from "react";

import Less from "./less";
import Greater from "./greater";
import AlterFun from "./alterFun";

import "./pages.css";

class Paging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagesNumber: 0,
      pagesArr: [],
      chooseNumber: 1,
      jumpNumber: "",
      alterBool: false,
      alterText: "",
      alterTimer: null
    };
    this.changeNumber = this.changeNumber.bind(this);
    this.addSubtractFun = this.addSubtractFun.bind(this);
    this.jumpNumberFun = this.jumpNumberFun.bind(this);
    this.inputNumber = this.inputNumber.bind(this);
    this.callbackFun = this.callbackFun.bind(this);
    this.closeAlter = this.closeAlter.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    if (props.pagesNumber !== state.pagesNumber) {
      const temporaryArr = [];
      for (let i = 1; i <= props.pagesNumber; i += 1) {
        temporaryArr.push(i);
      }
      return {
        pagesNumber: props.pagesNumber,
        pagesArr: temporaryArr
      };
    }
    return null;
  }
  componentWillUnmount() {
    if (this.state.alterTimer) {
      clearTimeout(this.state.alterTimer);
    }
  }
  closeAlter() {
    this.setState({ alterBool: false });
    clearTimeout(this.state.alterTimer);
  }
  callbackFun(performFun) {
    const isPerformFun = Object.prototype.toString.call(performFun);
    if (
      isPerformFun !== "[object Undefined]" &&
      isPerformFun === "[object Function]"
    ) {
      performFun(this.state.chooseNumber);
    }
  }
  changeNumber(chooseNumber, performFun) {
    this.setState({ chooseNumber }, () => {
      this.callbackFun(performFun);
    });
  }
  addSubtractFun(boolean, performFun) {
    const { chooseNumber, pagesNumber } = this.state;
    if (boolean && chooseNumber > 1) {
      this.setState({ chooseNumber: chooseNumber - 1 }, () => {
        this.callbackFun(performFun);
      });
    } else if (!boolean && chooseNumber < pagesNumber) {
      this.setState({ chooseNumber: chooseNumber + 1 }, () => {
        this.callbackFun(performFun);
      });
    }
  }
  inputNumber(even) {
    const temporaryNumber = parseInt(even.target.value, 10);
    if (!isNaN(temporaryNumber)) {
      this.setState({ jumpNumber: temporaryNumber });
    } else {
      this.setState({ jumpNumber: "" });
    }
  }
  jumpNumberFun(performFun) {
    const { pagesNumber, jumpNumber } = this.state;
    if (!isNaN(jumpNumber) && jumpNumber >= 1 && jumpNumber <= pagesNumber) {
      this.setState({ chooseNumber: jumpNumber }, () => {
        this.callbackFun(performFun);
      });
    } else {
      this.setState({ alterBool: true });
      this.setState({
        alterText: `Please enter number from 1 ~ ${this.props.pagesNumber}`
      });
      if (this.state.alterTimer) {
        clearTimeout(this.state.alterTimer);
      }
      this.setState({
        alterTimer: setTimeout(() => {
          this.setState({ alterBool: false });
        }, 2000)
      });
      const isDisplayAlter = Object.prototype.toString.call(
        this.props.isDisplayAlter
      );
      const isCustomAlterFun = Object.prototype.toString.call(
        this.props.customAlterFun
      );
      if (
        isDisplayAlter !== "[object Undefined]" &&
        isDisplayAlter === "[object Boolean]" &&
        !this.props.isDisplayAlter &&
        isCustomAlterFun !== "[object Undefined]" &&
        isCustomAlterFun === "[object Function]"
      ) {
        this.props.customAlterFun();
      }
    }
  }
  render() {
    const {
      pagesNumber,
      pagesArr,
      chooseNumber,
      jumpNumber,
      alterBool,
      alterText
    } = this.state;
    const firstLastPageIsBool = Object.prototype.toString.call(
      this.props.firstLastPage
    );
    const firstLastPage =
      firstLastPageIsBool !== "[object Undefined]" &&
      firstLastPageIsBool === "[object Boolean]"
        ? this.props.firstLastPage
        : true;
    const addSubtractPageIsBool = Object.prototype.toString.call(
      this.props.addSubtractPage
    );
    const addSubtractPage =
      addSubtractPageIsBool !== "[object Undefined]" &&
      addSubtractPageIsBool === "[object Boolean]"
        ? this.props.addSubtractPage
        : true;
    const jumpPageIsBool = Object.prototype.toString.call(this.props.jumpPage);
    const jumpPage =
      jumpPageIsBool !== "[object Undefined]" &&
      jumpPageIsBool === "[object Boolean]"
        ? this.props.jumpPage
        : false;
    const onlyOneBool = Object.prototype.toString.call(this.props.onlyOneBool);
    const onlyOne =
      onlyOneBool !== "[object Undefined]" && onlyOneBool === "[object Boolean]"
        ? this.props.onlyOneBool
        : false;
    const isDisplayAlter = Object.prototype.toString.call(
      this.props.isDisplayAlter
    );
    const displayAlter =
      isDisplayAlter !== "[object Undefined]" &&
      isDisplayAlter === "[object Boolean]"
        ? this.props.isDisplayAlter
        : true;
    if (!onlyOne && this.props.pagesNumber === 1) {
      return null;
    }
    return (
      <div className="eble-page">
        <ul className="eble-page-ul">
          {firstLastPage ? (
            <li
              className={chooseNumber === 1 ? "forbid-page" : null}
              onClick={even =>
                this.changeNumber(1, this.props.performFun, even)
              }
            >
              &lt;&lt;
            </li>
          ) : null}
          {addSubtractPage ? (
            <li
              className={chooseNumber === 1 ? "forbid-page" : null}
              onClick={even =>
                this.addSubtractFun(true, this.props.performFun, even)
              }
            >
              &lt;
            </li>
          ) : null}
          {pagesNumber <= 10 ? (
            <Less
              pagesArr={pagesArr}
              chooseNumber={chooseNumber}
              changeNumber={this.changeNumber}
              performFun={this.props.performFun}
              {...this.props}
            />
          ) : (
            <Greater
              chooseNumber={chooseNumber}
              changeNumber={this.changeNumber}
              performFun={this.props.performFun}
              {...this.props}
            />
          )}
          {addSubtractPage ? (
            <li
              className={chooseNumber === pagesNumber ? "forbid-page" : null}
              onClick={even =>
                this.addSubtractFun(false, this.props.performFun, even)
              }
            >
              &gt;
            </li>
          ) : null}
          {firstLastPage ? (
            <li
              className={chooseNumber === pagesNumber ? "forbid-page" : null}
              onClick={even =>
                this.changeNumber(pagesNumber, this.props.performFun, even)
              }
            >
              &gt;&gt;
            </li>
          ) : null}
          {jumpPage ? (
            <li className="jump-page">
              Jump&nbsp;
              <input
                type="text"
                value={jumpNumber}
                onChange={even => this.inputNumber(even)}
              />
              &nbsp;page
              <button
                onClick={even =>
                  this.jumpNumberFun(this.props.performFun, even)
                }
              >
                Go
              </button>
            </li>
          ) : null}
        </ul>
        {displayAlter ? (
          <AlterFun
            alterText={alterText}
            alterBool={alterBool}
            closeAlter={this.closeAlter}
            {...this.props}
          />
        ) : null}
      </div>
    );
  }
}

export default Paging;
