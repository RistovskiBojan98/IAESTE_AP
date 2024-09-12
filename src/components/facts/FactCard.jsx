import React from "react";

const FactCard = ({ fact }) =>
  <div className="bg-[#F1F1E6] shadow-md p-8 relative min-h-32 rounded-lg">
    {/* svg and path for the quotes*/}
    <svg
      height="40"
      viewBox="0 0 63 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute bottom-8 right-8 z-20"
    >
      <path
        opacity="0.1"
        d="M27.6 33.9V63.9H4.24683e-07V36.3L13.2 -1.64509e-05H27.6L16.5 33.9H27.6ZM62.7 33.9V63.9H35.1V36.3L48.3 -1.64509e-05H62.7L51.6 33.9H62.7Z"
        fill="#0B3D59"
      />
    </svg>
    <p className="z-50 relative text-[#0B3D59] font-bold text-lg">{fact}</p>
  </div>

export default FactCard;
