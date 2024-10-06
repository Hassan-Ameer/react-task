import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cart() {
  const [cart, setCart] = useState([]);

  const getCartItems = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    setCart(cartItems);
  };

  const handleDeleteCart = () => {
    localStorage.clear();
    toast.success("Cart cleared");
    setCart([]);
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div>
      {!cart && (
        <div className="cart-item p-4 m-4 rounded shadow">
          <h1>Cart is empty</h1>
        </div>
      )}

      {cart?.map((item) => {
        return (
          <div className="cart-item p-4 m-4 rounded shadow">
            <h1>{item.title}</h1>
            <h1>{item.price}</h1>
          </div>
        );
      })}

      <ToastContainer />

      <button
        onClick={handleDeleteCart}
        type="button"
        class="w-[90%] ms-[5%] mb-10 mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md"
      >
        Empty Cart
      </button>
    </div>
  );
}

export default Cart;
