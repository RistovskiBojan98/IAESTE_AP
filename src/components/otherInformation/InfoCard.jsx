import React from "react";
import classes from "./Other.module.css";

const OtherInfoCard = ({ title, description }) => {
  return (
    <div className={classes.container}>
      <h3>{title}</h3>
      <p> {description.split('\n').map((paragraph, index) => (
        <p key={index}>{paragraph}<br></br></p>
      ))}</p>
    </div>
  );
};

export default OtherInfoCard;
