import React, { useContext } from "react";
import Classes from "./MealItem.module.css";
import MealForm from "./MealForm";
import CartContext from "../../store/cart-context";
const MealtItem = (props) => {
  const cartcntx = useContext(CartContext);
  const addToCartHandler = (amount) => {
    cartcntx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={Classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={Classes.description}>{props.description}</div>
        <div className={Classes.description}>$ {props.price}</div>
      </div>
      <div>
        <MealForm onAddToCart={addToCartHandler} id={props.id} />
      </div>
    </li>
  );
};

export default MealtItem;
