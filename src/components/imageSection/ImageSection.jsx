import austriaImg from "./Austria.png";
import { secondImage } from "./secondImage";

const ImageSection = ({ selectedCountry }) => {
  console.log(selectedCountry);
  const selectedImg = secondImage.find(
    (item) => item.country.toLowerCase() === selectedCountry.toLowerCase()
  )
    ? secondImage.find((item) => item.country === selectedCountry).image
    : austriaImg;

  console.log(selectedImg);

  return (
    <div className="relative bg-[#0B3D59] h-[700px]">
      <div className="absolute inset-0 h-[700px]">
        <img className="h-full w-full object-cover" src={selectedImg} alt="" />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#1B75BB] via-[#27A9E1] to-[#49C0B5] mix-blend-multiply"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default ImageSection;
