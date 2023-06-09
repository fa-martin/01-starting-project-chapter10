import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContex from "../../Context/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_PASSINPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "USER_PASSBLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  //const [enteredPassword, setEnteredPassword] = useState("");
  //const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passState, dispatchPass] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const ctx = useContext(AuthContex);
  const { isValid: emailIsvalid } = emailState; //=> to optymize my code and not run a extra validation
  const { isValid: passIsValid } = passState; //      it's called destructuring

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsvalid && passIsValid);
    }, 500);
    return () => {
      clearTimeout(identifier);
    }; //cleanup function executes before the identifier but the second time
  }, [emailIsvalid, passIsValid]);

  const emailChangeHandler = (event) => {
    //setEnteredEmail(event.target.value);
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    //setFormIsValid(emailState.isValid && passState.isValid);
  };

  const passwordChangeHandler = (event) => {
    //setEnteredPassword(event.target.value);
    dispatchPass({ type: "USER_PASSINPUT", val: event.target.value });
    //setFormIsValid(passState.isValid && emailState.isValid);
  };

  const validateEmailHandler = () => {
    //setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    //setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPass({ type: "USER_PASSBLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid){
      ctx.onLogin(emailState.value, passState.value);
    }else if (!emailState.isValid){
        //to call a function in the input component
    }else{

    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        {/* <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div> */}
        <Input
          id="email"
          text="Email"
          isValid={emailState.isValid}
          htmlFor="email"
          type="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        {/* <div
          className={`${classes.control} ${
            passState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div> */}
        <Input
          id="password"
          text="Password"
          isValid={passState.isValid}
          htmlFor="password"
          type="password"
          value={passState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
