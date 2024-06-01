import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets.js";
import { IoMdArrowDropright } from "react-icons/io";
import { useNavigate } from "react-router-dom";
export default function Cart() {
  const { cartItems,url, food_list, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p className="item-money">
                    ${item.price * cartItems[item._id]}
                  </p>
                  <p className="cross" onClick={() => removeFromCart(item._id)}>
                    ❌
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECK OUT
            <IoMdArrowDropright />
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Enter promo code</p>
            <div className="cart-promocode-input">
              <input
                type="text"
                name="text"
                id="text"
                placeholder="promocode"
              />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
