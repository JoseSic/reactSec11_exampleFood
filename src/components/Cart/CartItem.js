import React from "react";
import Classes from "./CartItem.module.css";

const CartItem = (props) => {
  console.log(props.price, "cartItem");
  return (
    <li className={Classes["cart-item"]}>
      <div>
        <h2>{props.title}</h2>
        <div className={Classes["cart-summary"]}>
          <span className={Classes.price}>{props.price}</span>
          <span className={Classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={Classes.actions}>
        <button onClick={props.onRemove}>-</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
