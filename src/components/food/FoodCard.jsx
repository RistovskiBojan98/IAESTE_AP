import React from "react";
import classes from "./FoodCard.module.css";

const FoodCard = ({ title, description }) => {
  return (
    <div className={classes.container}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FoodCard;
