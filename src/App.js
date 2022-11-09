import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvaider from "./store/CartProvaider";
function App() {
  const [showCartModal, setShowCartModal] = useState(false);

  const showModalHandler = () => {
    console.log("boton");
    setShowCartModal(true);
  };

  const hideModalHandler = () => {
    setShowCartModal(false);
  };

  return (
    <CartProvaider>
      {showCartModal && <Cart onhideModalClick={hideModalHandler}></Cart>}
      <Header onShowModalClick={showModalHandler} />
      <main>
        <Meals></Meals>
      </main>
    </CartProvaider>
  );
}

export default App;
