import React from "react";
import { getCountryDbName } from "../global/global_functions";

interface PlaneProps {
  country: string;
}

const Plane: React.FC<PlaneProps> = ({ country }) => {
  const name = getCountryDbName(country)
  return (
    <div
      className="absolute inset-0 flex justify-center items-center bgGradient mix-blend-multiply"
      aria-hidden="true"
    >
      <div className="text-white text-center space-y-4">
        <p className="text-3xl font-semibold">Flying to</p>
        <p className="text-7xl font-semibold">{name}</p>
        <div className="flex justify-center"> {/* Container for centering the image */}
<svg fill="#ffffff" height="200px" width="200px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412.923 412.923" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M410.922,158.857c-2.096-3.86-5.57-6.675-9.782-7.923L59.895,49.775c-1.523-0.451-3.097-0.681-4.676-0.681 c-7.228,0-13.71,4.843-15.765,11.776L0.679,191.668c-2.452,8.272,1.94,16.962,9.861,20.01v135.703 c0,9.068,7.378,16.447,16.447,16.447h355.924c9.069,0,16.447-7.379,16.447-16.447V214.819l12.877-43.44 C413.486,167.165,413.019,162.718,410.922,158.857z M387.359,347.381c0,2.452-1.995,4.447-4.447,4.447h-91.604v-7.158 c0-3.313-2.686-6-6-6s-6,2.687-6,6v7.158H26.987c-2.452,0-4.447-1.995-4.447-4.447V215.304l55.476,16.445l-3.883,3.883 l-27.129-2.972l-5.618,4.549l21.588,9.581l-7.542,7.543l-8.044-0.787c-0.137-0.013-0.27,0.039-0.366,0.139l-2.816,2.816 c-0.182,0.169-0.196,0.455-0.027,0.641c0.042,0.046,0.093,0.082,0.149,0.106l7,3.186c0.023,1.145,0.469,2.282,1.341,3.155 c0.874,0.872,2.011,1.319,3.155,1.342l3.194,6.991c0.103,0.229,0.371,0.33,0.598,0.229c0.049-0.023,0.095-0.052,0.133-0.09 l2.816-2.834c0.099-0.095,0.149-0.228,0.139-0.365l-0.788-8.027l7.549-7.55l9.582,21.589l4.549-5.619l-2.971-27.129l7.405-7.406 l12.466,3.695v3.28c0,1.105,0.896,2,2,2h15.811l45.475,13.48h-61.286c-1.104,0-2,0.896-2,2v12.735c0,1.105,0.896,2,2,2h117.741 l59.258,17.566c-0.118,0.469-0.188,0.958-0.188,1.464v25.865c0,3.313,2.686,6,6,6s6-2.687,6-6v-23.828l61.713,18.294 c1.523,0.452,3.098,0.681,4.677,0.681c7.227,0,13.709-4.842,15.766-11.774l13.896-46.877V347.381z M400.731,167.967 l-38.772,130.799c-0.557,1.876-2.309,3.186-4.261,3.186c-0.425,0-0.851-0.063-1.267-0.186l-87.826-26.035l2.034-6.862 c0.941-3.177-0.87-6.516-4.048-7.458c-3.175-0.94-6.516,0.869-7.458,4.047l-2.034,6.863L15.185,200.608 c-2.351-0.697-3.698-3.177-3-5.528L50.958,64.281c0.556-1.876,2.308-3.187,4.26-3.187c0.425,0,0.852,0.063,1.267,0.186 l241.914,71.714l-2.512,8.473c-0.941,3.178,0.87,6.517,4.048,7.458c0.569,0.169,1.143,0.249,1.708,0.249 c2.588,0,4.977-1.688,5.75-4.296l2.512-8.473l87.825,26.035c1.14,0.337,2.08,1.099,2.646,2.143 C400.943,165.625,401.069,166.828,400.731,167.967z"></path> <path d="M281.293,211.815c-3.168-0.943-6.516,0.868-7.458,4.047l-7.35,24.798c-0.941,3.177,0.871,6.517,4.048,7.458 c0.568,0.169,1.143,0.249,1.708,0.249c2.588,0,4.977-1.688,5.75-4.297l7.351-24.798 C286.282,216.095,284.469,212.756,281.293,211.815z"></path> <path d="M295.995,162.218c-3.169-0.941-6.516,0.869-7.458,4.048l-7.351,24.798c-0.941,3.177,0.871,6.516,4.048,7.457 c0.568,0.169,1.142,0.249,1.708,0.249c2.588,0,4.977-1.688,5.75-4.296l7.351-24.798 C300.984,166.499,299.172,163.16,295.995,162.218z"></path> <path d="M58.69,114.857l5.806,5.043c-0.304,1.104-0.199,2.32,0.39,3.405c0.589,1.085,1.552,1.838,2.643,2.184l1.076,7.609 c0.034,0.249,0.261,0.424,0.508,0.39c0.053-0.008,0.105-0.023,0.153-0.048l3.505-1.917c0.122-0.063,0.208-0.176,0.237-0.311 l1.526-7.921l9.384-5.091l3.051,23.421l5.958-4.095l4.862-26.855l10.306-5.593c2.228-1.208,3.054-3.996,1.845-6.224 c-1.209-2.228-3.997-3.055-6.225-1.846l-10.306,5.594L68.243,92.042l-6.679,2.765l17.975,15.322l-9.374,5.089l-7.489-3.042 c-0.128-0.051-0.27-0.039-0.39,0.029l-3.5,1.898c-0.223,0.111-0.317,0.381-0.208,0.607 C58.604,114.767,58.643,114.817,58.69,114.857z"></path> <path d="M245.265,233.118L38.41,171.797c-1.055-0.311-2.172,0.29-2.486,1.35l-3.62,12.21c-0.151,0.508-0.093,1.056,0.16,1.523 c0.253,0.466,0.681,0.813,1.19,0.963l206.856,61.32c0.186,0.056,0.378,0.083,0.568,0.083c0.33,0,0.658-0.082,0.954-0.242 c0.466-0.253,0.813-0.681,0.964-1.189l3.619-12.21C246.928,234.544,246.324,233.432,245.265,233.118z"></path> <path d="M253.853,204.148L46.997,142.827c-0.508-0.15-1.056-0.093-1.522,0.16c-0.466,0.253-0.813,0.681-0.963,1.189l-3.62,12.212 c-0.314,1.059,0.29,2.172,1.349,2.485l206.856,61.319c0.187,0.056,0.378,0.083,0.568,0.083c0.33,0,0.658-0.082,0.954-0.242 c0.466-0.253,0.813-0.681,0.964-1.189l3.619-12.21C255.516,205.575,254.912,204.462,253.853,204.148z"></path> <path d="M262.439,175.178l-147.957-43.86c-1.058-0.313-2.172,0.289-2.486,1.35l-3.62,12.21c-0.151,0.508-0.093,1.056,0.16,1.522 c0.253,0.466,0.681,0.813,1.19,0.963l147.96,43.861c0.187,0.056,0.378,0.083,0.568,0.083c0.33,0,0.658-0.082,0.954-0.242 c0.466-0.253,0.813-0.682,0.964-1.19l3.617-12.211C264.102,176.605,263.498,175.493,262.439,175.178z"></path> <path d="M266.84,162.336c0.862,0,1.659-0.563,1.916-1.432l3.621-12.21c0.151-0.509,0.094-1.057-0.159-1.523 c-0.253-0.466-0.681-0.813-1.189-0.964l-147.96-43.86c-1.057-0.313-2.171,0.29-2.486,1.35l-3.62,12.21 c-0.151,0.508-0.093,1.056,0.16,1.522c0.253,0.466,0.681,0.813,1.189,0.963l147.959,43.86 C266.461,162.31,266.652,162.336,266.84,162.336z"></path> <path d="M256.82,317.606H41.068c-1.105,0-2,0.896-2,2v12.735c0,1.105,0.895,2,2,2H256.82c1.104,0,2-0.895,2-2v-12.735 C258.82,318.501,257.924,317.606,256.82,317.606z"></path> <path d="M256.82,287.39l-215.752-0.001c-0.53,0-1.039,0.211-1.414,0.586s-0.586,0.884-0.586,1.414v12.736c0,1.104,0.895,2,2,2 H256.82c1.104,0,2-0.896,2-2V289.39C258.82,288.286,257.924,287.39,256.82,287.39z"></path> </g> </g></svg>        </div>
      </div>
    </div>
  );
};

export default Plane;