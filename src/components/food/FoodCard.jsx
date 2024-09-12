import React from "react";
import css from "../app.module.css";

const FoodCard = ({ title, description }) =>
  <div className={css.cardContainer}>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>

export default FoodCard;
