import classes from "./CheckOut.module.css";
import useInput from "../hooks/use-input";

const CheckOut = (props) => {
  let formIsValid = false;
  const {
    value: nameValue,
    valueIsValid: nameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    resetValues: resetNameValues,
  } = useInput((value) => value.trim() !== "");

  const {
    value: addressValue,
    valueIsValid: addressIsValid,
    hasError: addressInputHasError,
    valueChangeHandler: addressChangeHandler,
    valueBlurHandler: addressBlurHandler,
    resetValues: resetAddressValues,
  } = useInput((value) => value.trim() !== "");

  const {
    value: telValue,
    valueIsValid: telIsValid,
    hasError: telInputHasError,
    valueChangeHandler: telChangeHandler,
    valueBlurHandler: telBlurHandler,
    resetValues: resetTeleValues,
  } = useInput((value) => value.trim() !== "");

  const confirmHandler = (event) => {
    event.preventDefault();
    console.log("Formulario Enviado");
    resetTeleValues();
    resetAddressValues();
    resetNameValues();

    props.onSubmitOrderHandler({
      name: nameValue,
      address: addressValue,
      telephone: telValue,
    });
  };
  console.log(nameInputHasError, nameValue);
  const nameCodeControlClasses = nameInputHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;
  const addressCodeControlClasses = addressInputHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;
  const telCodeControlClasses = telInputHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  if (nameIsValid && addressIsValid && telIsValid) {
    formIsValid = true;
  }
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameCodeControlClasses}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={nameValue}
          onBlur={nameBlurHandler}
          onChange={nameChangeHandler}
          type="text"
        ></input>
        {nameInputHasError && <p>Enter a valid name</p>}
      </div>
      <div className={addressCodeControlClasses}>
        <label htmlFor="address">Address</label>
        <input
          id="address"
          value={addressValue}
          onBlur={addressBlurHandler}
          onChange={addressChangeHandler}
          type="text"
        ></input>
        {addressInputHasError && <p>Enter an address name</p>}
      </div>
      <div className={telCodeControlClasses}>
        <label htmlFor="telephone">Telephone</label>
        <input
          id="telephone"
          value={telValue}
          onBlur={telBlurHandler}
          onChange={telChangeHandler}
          type="tel"
        ></input>
        {telInputHasError && <p>Enter a valid telephone</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onhideModalClick}>
          Cancel
        </button>
        <button className={classes.submit} disabled={!formIsValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default CheckOut;
