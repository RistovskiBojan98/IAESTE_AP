import React from "react";
import classes from "./FactCard.module.css";

const FactCard = ({ fact }) => {
  return (
    <div className={classes.container}>
      <svg
        height="40"
        viewBox="0 0 63 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={classes.quotes}
      >
        <path
          opacity="0.5"
          d="M27.6 33.9V63.9H4.24683e-07V36.3L13.2 -1.64509e-05H27.6L16.5 33.9H27.6ZM62.7 33.9V63.9H35.1V36.3L48.3 -1.64509e-05H62.7L51.6 33.9H62.7Z"
          fill="#0B3D59"
        />
      </svg>
      <p>{fact}</p>
    </div>
  );
};

export default FactCard;
