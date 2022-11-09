import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  let updatedItems;
  let updatedItem;
  let existIndexMeal;
  let existCardItem;
  let updatedAmount;
  if (action.type === "ADD") {
    updatedAmount = state.totalAmount + action.item.amount * action.item.price;

    existIndexMeal = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    existCardItem = state.items[existIndexMeal];
    if (existCardItem) {
      updatedItem = {
        ...existCardItem,
        amount: existCardItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      updatedItems[existIndexMeal] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return { items: updatedItems, totalAmount: updatedAmount };
  }
  if (action.type === "DELETE") {
    existIndexMeal = state.items.findIndex((item) => item.id === action.id);
    existCardItem = state.items[existIndexMeal];
    updatedAmount = state.totalAmount - existCardItem.price;
    const validAmount = existCardItem.amount - 1;
    if (validAmount === 0) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
      console.log("DELETE1", updatedItems);
    } else {
      updatedItem = { ...existCardItem, amount: validAmount };
      updatedItems = [...state.items];
      updatedItems[existIndexMeal] = updatedItem;
      console.log("DELETE2", updatedItems);
    }
    return { items: updatedItems, totalAmount: updatedAmount };
  }
  if (action.type === "CLEAR") {
    return defaultCartState;
  }
  return defaultCartState;
};

const CartProvaider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartContext = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartContext = (id) => {
    dispatchCartAction({ type: "DELETE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartContext,
    removeItem: removeItemFromCartContext,
    clearCart: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvaider;
