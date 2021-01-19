import React from "react";
import { FiDelete } from "react-icons/fi";

export default function Button(props) {
  const handleClick = (value, display) => {
    props.handleButton(value, display);
  };

  const button = props.button;

  return (
    <button
      className={button.class}
      onClick={() => handleClick(button.value, button.display)}
    >
      {button.display === "Del" ? <FiDelete /> : button.display}
    </button>
  );
}
