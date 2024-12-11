import React from "react";
import css from "../app.module.css";

const FoodCard = ({ title, description }) =>
  <div className={css.cardContainer}>
    <h3 className="pt-2">{title}</h3>
    { !!description && 
      <p className="border-t pt-5">{description}</p>
    }
    
  </div>

export default FoodCard;
