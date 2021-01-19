import React from "react";
import { RiArrowGoBackLine } from "react-icons/ri";

const portfolio = (
  <a className="calculator-portfolio" href="http://www.sunkenworld.com/#page-3">
    <p className="portfolio-text">
      <RiArrowGoBackLine /> Back to portfolio
    </p>
  </a>
);

const text = (
  <div id="text">
    <h2>This Calculator is better than yours.</h2>
    <p>
      Sorry, that was rude. What I mean is, most calculator apps kind of suck.
      They're rudimentary, inflexible, and just not that useful.
    </p>
    <p>But not this one. </p>
    <p>
      This one lets you see your entire formula and dynamically renders the
      output in a seperate display. Achieving this is more complicated than it
      sounds. For one, the formula displayed is not the same as the one used for
      calculations. To this end, a display formula and a computational formula
      need to be maintained at all times. So a formula that looks like this
    </p>
    <code>55×15%÷9</code>
    <p>is actually computing this</p>
    <code>55*0.15/9</code>
    <p>
      As you might be able to imagine, this makes percentages particularly
      tricky. Especially when the delete button is factored in (easily the most
      complicated button). But I believe all of this effort is worthwhile, as
      the results are intuitive, functional, and powerful, as I hope you'll
      agree.
    </p>
    <p>
      If you want to learn more, check out the README and code over on{" "}
      <a href="https://github.com/mackenziewritescode/calculator">Github</a>.
    </p>
  </div>
);

const footer = (
  <footer id="drum-footer">
    <p>
      This site was made by{" "}
      <a className="footer-link" href="http://www.sunkenworld.com/">
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

export { portfolio, text, footer };
