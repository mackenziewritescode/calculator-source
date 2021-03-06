import React, { useState, useEffect } from "react";
import "../styles/Calculator.scss";
import { portfolio, text, footer } from "./static";
import Buttons from "./Buttons";

function removeOpBeforeEquals(string) {
  if (testMultipleOps(string)) {
    return (
      Math.round(10000000000 * eval(string.slice(0, -1))) / 10000000000
    ).toString();
  } else {
    return (Math.round(10000000000 * eval(string)) / 10000000000).toString();
  }
}

function testMultipleOps(string) {
  let opRegex = /[-/*+=]/g;
  let lastChar = string.toString().slice(-1);
  if (opRegex.test(lastChar)) {
    return true;
  } else {
    return false;
  }
}

function testOps(string, op) {
  let opRegex = /[-/*+=]/g;
  let lastChar = string.slice(-1);

  // if the last character is an operator
  if (opRegex.test(lastChar)) {
    // if it's +*/ followed by -, then it's allowed
    if (op === "-" && /[+*/]/.test(lastChar)) {
      return true;
    }
    // if it's --, then don't allow
    return false;
  }
  // if empty string, +*/ not allowed
  if (string === "0" && /[+*/]/.test(op)) {
    return false;
  }
  // all other conditions are allowed
  return true;
}

function decimalTest(formula, currentNum) {
  let lastChar = formula.toString().slice(-1);
  // test if the last char is % or if there's already a decimal
  return lastChar === "%" || /\./.test(currentNum);
}

// --------------------------------------------------- -+- APP -+-
function App() {
  const [output, setOutput] = useState("0");
  const [formula, setFormula] = useState("0");
  const [displayFormula, setDisplayFormula] = useState("");

  useEffect(() => {
    document.title = "A Better Calculator";
  });

  const handleButton = (value, display) => {
    const numArr = formula
      .toString()
      .replace(/[-/*+=]/g, " ")
      .split(" ");
    const currentNum = numArr[numArr.length - 1];
    const percentage = (currentNum / 100).toString();
    const reversePercentage = (currentNum * 100).toString();
    const formulaWithPercentage = formula
      .toString()
      .slice(0, -currentNum.length)
      .concat(percentage);
    const formulaReversePercentage = formula
      .toString()
      .slice(0, -currentNum.length)
      .concat(reversePercentage);
    const displayDelString = displayFormula.slice(0, -1).toString();
    const delString = formula.toString().slice(0, -1);

    switch (value) {
      case "C":
        setDisplayFormula("");
        setFormula("0");
        setOutput("0");
        break;
      case "Del":
        if (displayFormula.length <= 1) {
          //------------------------- if there's only 1 char, set to 0
          setDisplayFormula("0");
          setFormula("0");
          setOutput("0");
        } else if (
          // ----------------------- if the only char is an operator, set to 0
          formula.length <= 3 &&
          /[-/*+=]/.test(formula[1]) === true &&
          formula[0] === 0
        ) {
          setDisplayFormula("0");
          setFormula("0");
          setOutput("0");
        } else if (
          // ----------------- if the last char is %, multiply last char by 100
          displayFormula.toString().slice(-1) === "%"
        ) {
          setDisplayFormula(displayDelString);
          setFormula(formulaReversePercentage);
          handleOutput(formulaReversePercentage);
        } else {
          setDisplayFormula(displayDelString);
          setFormula(delString);
          handleOutput(delString);
        }
        break;
      case "=":
        setDisplayFormula(removeOpBeforeEquals(formula));
        setFormula(removeOpBeforeEquals(formula));
        break;
      case "%":
        if (
          testMultipleOps(formula) ||
          displayFormula.toString().slice(-1) === "%" ||
          formula.toString() === "0"
        ) {
          setDisplayFormula(displayFormula);
          setFormula(formula);
        } else {
          setDisplayFormula(displayFormula + "%");
          setFormula(formulaWithPercentage);
          handleOutput(formulaWithPercentage);
        }
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        if (testOps(formula, value)) {
          setDisplayFormula(displayFormula + display);
          setFormula(formula + value);
        } else {
          setDisplayFormula(displayFormula);
          setFormula(formula);
        }
        break;
      case ".":
        if (!decimalTest(formula, currentNum)) {
          setDisplayFormula(displayFormula + ".");
          setFormula(formula + ".");
        }
        break;
      default:
        if (formula === "0") {
          setDisplayFormula(display);
          setFormula(value);
          handleOutput(parseFloat(value));
        } else {
          setDisplayFormula(displayFormula + display);
          setFormula(formula + value);
          handleOutput(formula + value);
        }
    }
  };

  function handleOutput(string) {
    let answer;
    let lastChar = string.toString().slice(-1);

    if (lastChar === "-") {
      string = string.toString().slice(0, -1);
    }

    if (testMultipleOps(string)) {
      answer = (
        Math.round(10000000000 * eval(string.slice(0, -1))) / 10000000000
      ).toString();
    } else {
      answer = (
        Math.round(10000000000 * eval(string)) / 10000000000
      ).toString();
    }
    if (answer === "NaN") {
      answer = "0";
    }
    setOutput(answer);
  }

  return (
    <div id="calculator-wrapper">
      {portfolio}
      <div id="content">
        <div id="calculator">
          <div id="formula">{displayFormula}</div>
          <div id="output">{output}</div>
          <Buttons handleButton={handleButton} />
          {/* <div id="debugFormula" style={{ color: "red" }}>
            {formula}
          </div> */}
        </div>
        {text}
      </div>
      {footer}
    </div>
  );
}

export default App;
