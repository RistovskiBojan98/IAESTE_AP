import React from "react";
import planeImg from "../../images/Plane.jpg";

const Plane = ({ country }) => {
  const strings = country.split('-')
  console.log(strings)
  let name = strings[0]
  if (strings.length) 
    for (let i = 1; i < strings.length; i++)
      name = name + " " + strings[i]
  

  return (
    <div
      className="absolute inset-0 flex justify-center items-center bg-gradient-to-r from-[#1B75BB] via-[#27A9E1] to-[#49C0B5] mix-blend-multiply"
      aria-hidden="true"
    >
      <div className="text-white text-center space-y-4">
        <p className="text-3xl font-semibold">Entering</p>
        <p className="text-7xl font-semibold">{name}</p>
        <div className="flex justify-center"> {/* Container for centering the image */}
          <img src={planeImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Plane;
