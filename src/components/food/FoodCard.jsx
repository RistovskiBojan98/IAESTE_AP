import React from "react";
import classes from "./FoodCard.module.css";

const FoodCard = ({ key, title, description }) => {
  return (
    <div className={classes.container} key={key}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FoodCard;
