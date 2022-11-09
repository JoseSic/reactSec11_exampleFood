import React, { useContext, useEffect, useState } from "react";
import Classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [useBumpAnimation, setBumpAnimation] = useState(false);
  const cartCntx = useContext(CartContext);

  useEffect(() => {
    if (cartCntx.items.length === 0) {
      return;
    }
    setBumpAnimation(true);
    const timerId = setTimeout(() => {
      setBumpAnimation(false);
    }, 300);
    return () => {
      clearTimeout(timerId);
    };
  }, [cartCntx.items]);
  const numberOfCartItems = cartCntx.items.reduce((cartNumber, item) => {
    return cartNumber + item.amount;
  }, 0);
  return (
    <>
      <button
        className={`${Classes.button} ${useBumpAnimation && Classes.bump}`}
        onClick={props.onShowModalClick}
      >
        <span className={Classes.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={Classes.badge}>{numberOfCartItems}</span>
      </button>
    </>
  );
};

export default HeaderCartButton;
