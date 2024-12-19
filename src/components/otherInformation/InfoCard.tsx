import React from "react";
import css from "../app.module.css";

interface OtherInfoCardProps {
  title: string;
  description: string;
}

const OtherInfoCard: React.FC<OtherInfoCardProps> = ({ title, description }) => {
  return (
    <div className={`${css.cardContainer} h-60 overflow-y-scroll`} style={{ scrollbarWidth: 'thin'}}>
      <h3>{title}</h3>
      <div className="border-t pt-5">{description.split('\n').map((paragraph, index) => (
        <p key={index}>{paragraph}<br></br></p>
      ))}</div>
    </div>
  );
};

export default OtherInfoCard;
