import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import CheckOut from "./CheckOut";

const Cart = (props) => {
  const cartCntx = useContext(CartContext);
  const totalAmount = `$ ${cartCntx.totalAmount.toFixed(2)}`;
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isSubmittingData, setIsSubmittingData] = useState(false);
  const [isHasError, setHasError] = useState(null);
  const [isDidSubmit, setDidSubmit] = useState(false);

  const addCartHandler = (meal) => {
    cartCntx.addItem({
      id: meal.id,
      name: meal.name,
      amount: 1,
      price: meal.price,
    });
  };

  const removeCartHandler = (id) => {
    cartCntx.removeItem(id);
  };
  const cartList = (
    <ul className={classes["cart-items"]}>
      {cartCntx.items.map((meal) => (
        <CartItem
          key={meal.id}
          title={meal.name}
          price={meal.price}
          amount={meal.amount}
          onRemove={removeCartHandler.bind(null, meal.id)}
          onAdd={addCartHandler.bind(null, meal)}
        />
      ))}
    </ul>
  );
  const sendOrderData = async (userData) => {
    try {
      //setIsSubmittingData(true);
      //setHasError(null);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: userData, orderedItems: cartCntx.items }),
      };

      const response = await fetch(
        "http://localhost:3001/api/orders/",
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Someting went wrong!");
      }

      const data = await response.json();
      console.log(data);
      setIsSubmittingData(false);
      setDidSubmit(true);
      cartCntx.clearCart();
    } catch (error) {
      console.log(error.message);
      setIsSubmittingData(false);
      setHasError(error.message);
    }
  };

  const checkOutHandler = () => {
    setIsCheckOut(true);
  };

  const submitOrderHandler = (userData) => {
    setIsSubmittingData(true);
    setHasError(null);
    setTimeout(() => {
      sendOrderData(userData);
    }, 4000);
  };

  const cartModalContent = (
    <>
      {cartList}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && (
        <CheckOut
          onSubmitOrderHandler={submitOrderHandler}
          onhideModalClick={props.onhideModalClick}
        ></CheckOut>
      )}
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onhideModalClick}>
          Close
        </button>
        <button className={classes.button} onClick={checkOutHandler}>
          Order
        </button>
      </div>
    </>
  );

  const dataSent = (
    <>
      <p>Se han enviado los datos con exito</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onhideModalClick}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal>
      {isSubmittingData && <p>Se estan enviando los datos</p>}
      {!isSubmittingData && !isHasError && !isDidSubmit && cartModalContent}
      {!isSubmittingData && !isDidSubmit && isHasError && <p>{isHasError}</p>}
      {!isSubmittingData && !isHasError && isDidSubmit && dataSent}
    </Modal>
  );
};

export default Cart;
