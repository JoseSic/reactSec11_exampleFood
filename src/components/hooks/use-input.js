import { useState, useReducer } from "react";
const initialValues = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "ADD") {
    return { value: action.value, isTouched: state.value };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isTouched: true };
  }
  if (action.type === "RESET") {
    return initialValues;
  }
  return initialValues;
};

const UseInput2 = (validateValue) => {
  const [inputState, dispatchState] = useReducer(
    inputStateReducer,
    initialValues
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatchState({ type: "ADD", value: event.target.value });
  };

  const valueBlurHandler = () => {
    dispatchState({ type: "BLUR" });
  };

  const resetValues = () => {
    dispatchState({ type: "RESET" });
  };

  return {
    value: inputState.value,
    valueIsValid,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    resetValues,
  };
};
const UseInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const valueBlurHandler = () => {
    console.log("toco");
    setIsTouched(true);
  };

  const resetValues = () => {
    setEnteredValue("");
    setIsTouched("");
  };

  return {
    value: enteredValue,
    valueIsValid,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    resetValues,
  };
};

export default UseInput;
