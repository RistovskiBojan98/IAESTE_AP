import React from "react";
import "./Loader.css"
import { bgGradient } from "../../../components/global/global_functions";

const Loader = () => {
    return (
        <div className={`h-screen w-full ${bgGradient} flex items-center justify-center`}>
          <div className="loader relative">
            <div className="wheel"></div>
            <div className="electric-spark"></div>
          </div>
        </div>
      );
};

export default Loader;