import React from "react";
import buttonsArr from "./buttonsArr";
import Button from "./Button";

export default function Buttons(props) {
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
