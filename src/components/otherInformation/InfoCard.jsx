import React from "react";
import css from "../app.module.css";

const OtherInfoCard = ({ title, description }) => {
  return (
    <div className={css.cardContainer}>
      <h3>{title}</h3>
      <div>{description.split('\n').map((paragraph, index) => (
        <p key={index}>{paragraph}<br></br></p>
      ))}</div>
    </div>
  );
};

export default OtherInfoCard;
