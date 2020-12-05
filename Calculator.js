import React, { useState, useEffect } from "react";
import "./Calculator.scss";
import buttonsArr from "./buttonsArr";
import { FiDelete } from "react-icons/fi";
import { RiArrowGoBackLine } from "react-icons/ri";

const portfolio = (
  <a
    className="calculator-portfolio"
    href="http://www.sunkenworld.com/"
  >
    <p className="portfolio-text">
      <RiArrowGoBackLine /> Back to portfolio
    </p>
  </a>
);

const text = (
  <div id="text">
    <h2>This Calculator is better than yours.</h2>
    <p>
      Sorry, that was rude. What I mean is, most calculator
      apps kind of suck. They're rudimentary, inflexible,
      and just not that useful.
    </p>
    <p>But not this one. </p>
    <p>
      This one lets you see your entire formula and
      dynamically renders the output in a seperate display.
      Achieving this is more complicated than it sounds. For
      one, the formula displayed is not the same as the one
      used for calculations. To this end, a display formula
      and a computational formula need to be maintained at
      all times. So a formula that looks like this
    </p>
    <code>55×15%÷9</code>
    <p>is actually computing this</p>
    <code>55*0.15/9</code>
    <p>
      As you might be able to imagine, this makes
      percentages particularly tricky. Especially when the
      delete button is factored in (easily the most
      complicated button). But I believe all of this effort
      is worthwhile, as the results are intuitive,
      functional, and powerful, as I hope you'll agree.
    </p>
    <p>
      If you want to learn more, check out the README and
      code over on{" "}
      <a href="https://github.com/mackenziewritescode/calculator">
        Github
      </a>
      .
    </p>
  </div>
);

const footer = (
  <footer id="drum-footer">
    <p>
      This site was made by{" "}
      <a
        className="footer-link"
        href="http://www.sunkenworld.com/"
      >
        Mackenzie Charlton
      </a>{" "}
      in 2020 with{" "}
      <a className="footer-link" href="https://reactjs.org">
        React
      </a>
      .
    </p>
  </footer>
);

function Formula(props) {
  return <div id="formula">{props.displayFormula}</div>;
}

function Output(props) {
  return <div id="output">{props.output}</div>;
}

function Button(props) {
  const handleClick = (value, display) => {
    props.handleButton(value, display);
  };

  const button = props.button;

  return (
    <button
      className={button.class}
      onClick={() =>
        handleClick(button.value, button.display)
      }
    >
      {button.display === "Del" ? (
        <FiDelete />
      ) : (
          button.display
        )}
    </button>
  );
}

function Buttons(props) {
  const buttons = buttonsArr.map((button) => (
    <Button
      button={button}
      key={button.value}
      value={button.value}
      display={button.display}
      type={button.type}
      className={button.class}
      handleButton={props.handleButton}
    />
  ));
  return <div id="buttonWrap">{buttons}</div>;
}

function App() {
  const [output, setOutput] = useState("0");
  const [formula, setFormula] = useState("0");
  const [displayFormula, setDisplayFormula] = useState("");

  useEffect(() => {
    document.title = "A Better Calculator"
  })

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
    const displayDelString = displayFormula
      .slice(0, -1)
      .toString();
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
        if (
          testMultipleOps(formula) ||
          testEmptyDisplay(displayFormula, value)
        ) {
          setDisplayFormula(displayFormula);
          setFormula(formula);
        } else {
          setDisplayFormula(displayFormula + display);
          setFormula(formula + value);
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

  function removeOpBeforeEquals(string) {
    if (testMultipleOps(string)) {
      return (
        Math.round(
          10000000000 * eval(string.slice(0, -1))
        ) / 10000000000
      ).toString();

      //return eval(string.slice(0, -1)).toString();
    } else {
      return (
        Math.round(10000000000 * eval(string)) / 10000000000
      ).toString();
      //return eval(string).toString();
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

  // function decimalTest(formula, currentNum) {
  //   let lastChar = formula.toString().slice(-1);
  //   // test if the last char is % or if there's already a decimal
  //   if (lastChar === "%" || /\./.test(currentNum)) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  function decimalTest(formula, currentNum) {
    let lastChar = formula.toString().slice(-1);
    // test if the last char is % or if there's already a decimal
    return lastChar === "%" || /\./.test(currentNum)
  }

  function testEmptyDisplay(string, op) {
    if (string === "" && /[+*/]/.test(op)) {
      return true;
    } else {
      return false;
    }
  }
  // don't need tostring. do it to set output. it's cofusing to set answer to either a string or number
  function handleOutput(string) {
    let answer;
    if (testMultipleOps(string)) {
      answer = (
        Math.round(
          10000000000 * eval(string.slice(0, -1))
        ) / 10000000000
      ).toString();
    } else {
      answer = (
        Math.round(10000000000 * eval(string)) / 10000000000
      ).toString();
    }
    if (answer === "NaN") {
      answer = 0;
    }

    setOutput(answer);
  }

  return (
    <div id="calculator-wrapper">
      {portfolio}
      <div id="content">
        <div id="calculator">
          <Formula displayFormula={displayFormula} />
          <Output output={output} />
          <Buttons handleButton={handleButton} />
          {/* <div id="debugFormula">{formula}</div> */}
        </div>
        {text}
      </div>
      {footer}
    </div>
  );
}

export default App;
