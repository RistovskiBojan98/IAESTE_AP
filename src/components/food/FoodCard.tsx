import React from "react";

interface FoodCardProps {
  title: string
  description: string
}

const FoodCard: React.FC<FoodCardProps> = ({ title, description }) =>
  <div className="cardContainer">
    <h3 className="pt-2">{title}</h3>
    { !!description && 
      <p className="border-t pt-5">{description}</p>
    }
    
  </div>

export default FoodCard;
