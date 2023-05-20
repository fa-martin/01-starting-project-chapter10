import React, { useRef, useEffect } from "react";
import classes from "../../Login/Login.module.css";

const Input = (props) => {
  const ref= useRef();

  useEffect(()=>{
    ref.current.focus();
  },[]);

  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.htmlFor}>{props.text}</label>
      <input
        ref={ref}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
};

export default Input;
