import React, { useState, useEffect } from "react";
import { Images } from "../../components/gallery/Images";
import { countryImages } from "../../components/hero/heroImages";
import { Carousel } from "react-responsive-carousel";

const Gallery = ({ selectedCountry }) => {
    const [images, setImages] = useState([])
    const [heroImg, setHeroImg] = useState("")

    useEffect(() => {
        if (selectedCountry) {
            setImages(Images[selectedCountry.name])
            const heroImage = countryImages.find((item) => item.country === selectedCountry.name)?.image
            setHeroImg(heroImage)
        }
    }, [selectedCountry])

    return (
        <section>
            <div className="">
                <h1>Hero banner image</h1>
                <div className="flex justify-center w-full p-1">
                    <img src={heroImg} alt="NoHeroImg" style={{ height: "500px", width: "auto" }} />
                </div>
            </div>
            <div>
                <h1>Gallery</h1>
                <Carousel
                    showArrows={true}
                    showThumbs={false}
                >
                    {images?.map(image =>
                        <img src={image} alt="Img" style={{ height: "700px", width: "auto" }} />
                    )}
                </Carousel>
            </div>

        </section>
    )
}

export default Gallery;