import React, { useState, useEffect } from "react";
import classes from "./Gallery.module.css";
import picture1 from './images/Austria/1.jpg';

const Gallery = ({ country }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages = [];

      for (let i = 2; i <= 12; i++) {
        let imagePath = ''
        try {
          imagePath = `./images/${country}/${i}.jpg`;
          const response = await fetch(imagePath);
          if (response.ok) {
            console.log(response)
            loadedImages.push(imagePath);
          } else {
            console.error(`Error loading image: ${imagePath}`);
          }
        } catch (error) {
          console.error(`Error loading image: ${imagePath}`, error);
        }
      }

      setImages(loadedImages);
    };

    loadImages();
  }, [country]);

  console.log(images)
  // images.forEach((image, index) => {
  //   console.log(image, index)
  // })

  return (
    <section
      className={`relative mx-auto max-w-7xl py-24 px-4 sm:px-6 lg:py-32 lg:px-8 ${classes.gallery}`}
    >
      <img src={picture1} alt="img path not found" />
      <div>
        {images.map((image, index) => (
          <div
            key={index}
            // className={classes.square}
            // style={{ backgroundImage: `url(${image})` }}
          >
            <img src={image} alt='' />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
