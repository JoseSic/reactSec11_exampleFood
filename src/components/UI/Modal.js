import React from "react";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

const BackdropDiv = () => {
  return <div className={classes.backdrop}></div>;
};

const ModalDivLL = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <BackdropDiv></BackdropDiv>,
        document.getElementById("backdrop-div")
      )}
      {ReactDOM.createPortal(
        <ModalDivLL>{props.children}</ModalDivLL>,
        document.getElementById("modal-div")
      )}
    </React.Fragment>
  );
};

export default Modal;
