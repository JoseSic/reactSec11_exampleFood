import React from "react";
import Classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={Classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} id={props.input.id} {...props.input}></input>
    </div>
  );
});

export default Input;
