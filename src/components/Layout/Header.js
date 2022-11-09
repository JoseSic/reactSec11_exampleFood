import React from "react";
import Classes from "./Header.module.css";
import imgMeals from "../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {
  return (
    <React.Fragment>
      <header className={Classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton
          onShowModalClick={props.onShowModalClick}
        ></HeaderCartButton>
      </header>
      <div className={Classes["main-image"]}>
        <img src={imgMeals} alt="imagen de comida"></img>
      </div>
    </React.Fragment>
  );
};

export default Header;
