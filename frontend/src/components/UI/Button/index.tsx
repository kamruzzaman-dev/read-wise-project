import React from "react";

const Button = (props) => {
  // without handler
  let button = (
    <button type={props.type} name={props.name} className={props.className}>
      {props.children}
    </button>
  );
  // with handler
  if (props.onClick) {
    button = (
      <button
        type={props.type}
        name={props.name}
        className={props.className}
        onClick={props.onClick}
        disabled={props.disabled}
        {...props}
      >
        {props.children}
      </button>
    );
  }
  return button;
};

export default Button;
