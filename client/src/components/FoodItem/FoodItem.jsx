import React, { useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
export default function FoodItem({ id, name, price, description, image }) {
  const [itemCount, setItemCount] = useState(0);
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={image} className="food-item-image" alt="" />
        {!itemCount ? (
          <img
            src={assets.add_icon_white}
            alt="add"
            className="add"
            onClick={() => setItemCount((prev) => prev + 1)}
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => setItemCount((prev) => prev - 1)}
              src={assets.remove_icon_red}
              alt="remove"
            />
            <p>{itemCount}</p>
            <img
              onClick={() => setItemCount((prev) => prev + 1)}
              src={assets.add_icon_green}
              alt="add"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
}
