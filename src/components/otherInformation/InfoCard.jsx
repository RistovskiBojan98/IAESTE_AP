import React from "react";
import classes from "./Other.module.css";

const OtherInfoCard = ({ title, description }) => {
  return (
    <div className={classes.container}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default OtherInfoCard;
