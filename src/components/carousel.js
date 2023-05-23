import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowCircleLeft, ArrowCircleRight } from "heroicons-react";
import Food from "./food";
import { food } from "./food/dataFood";

function Arrow(props

) {
    let className =
        props.type === "prev"
            ? " -left-8 mt-1 text-white z-50 h-32 inset-y-0 w-8 text-2xl text-center  cursor-pointer hover:opacity-80 transition duration-300 ease-in-out hover:scale-105"
            : " mt-1  -right-9 inset-y-0 right-0 text-white right-0 z-10 h-32 inset-y-0 w-8 text-2xl text-center  cursor-pointer hover:opacity-80 transition duration-300 ease-in-out hover:scale-105 ";
    const char =
        props.type === "next" ? (
            <ArrowCircleRight className=" absolute right-2 h-[7.5rem] w-[1rem] lg:-mt-52 sm:-mt-[23.7rem] text-gray-500  " />
        ) : (
            <ArrowCircleLeft className=" absolute left-2 h-[7.5rem] w-[1rem] lg:mt-80 sm:mt-[21rem] text-gray-500 " />
        );
    return (
        <div className={className} onClick={props.onClick}>
            {char}
        </div>
    );
}



export default class SimpleSlider extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,

        };
        return (
            <div>
                <h2> </h2>
                <Slider className=""
                    prevArrow={<Arrow type="prev" onClick={undefined} />}
                    nextArrow={<Arrow type="next" onClick={undefined} />}
                    {...settings}>


                    {food.map((f) => {
                        return (
                            <div>
                                <div className=" flex justify-center">
                                    <Food title={f.title} description={f.description} />
                                </div>
                            </div>
                        )
                    })}


                </Slider>
            </div>
        );
    }
}
