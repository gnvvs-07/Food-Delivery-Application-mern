import React from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
export default function Add() {
  return (
    <div className="add">
      <form className="flex-col">
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={assets.upload_area} alt="" />
          </label>
          <input type="file" name="image" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>product name</p>
          <input type="text" name="name" placeholder="Enter Food name" />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            name="description"
            id="description"
            rows={6}
            placeholder="Write about your dish"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select name="category" id="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure veg</option>
              <option value="Pasta">pasta</option>
              <option value="Noodles">Noodles</option>
              <option value="Veg Biryani">Veg Biryani</option>
              <option value="Paneer Biryani">Paneer Biryani</option>
              <option value="Chicken Biryani">Chicken Biryani</option>
              <option value="Starter">Starter</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              type="number"
              name="price"
              id="price"
              required
              placeholder="$price"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    </div>
  );
}
