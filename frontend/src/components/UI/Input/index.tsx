import React from "react";

const Input = (props) => {
  return (
    <div className={`input_group ${props.inputGroupClass}`}>
      {props.label && (
        <label htmlFor={props.label}>
          {props.label}{" "}
          {props.isRequired && <span style={{ color: "red" }}>*</span>}{" "}
        </label>
      )}
      <input
        type={props.type}
        name={props.name}
        className={props.className}
        placeholder={props.placeholder}
        id={props.id}
        value={props.value}
        style={props.style}
        onChange={props.onChange}
        disabled={props.disabled}
        ref={props.ref}
        autoComplete="off"
      />
      {!props.error?.includes("required") && <p style={{color: 'red', fontSize:"13px", width: '100%'}}>{props.error}</p>}
    </div>
  );
};

export default Input;
