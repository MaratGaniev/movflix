import React from "react";
import classes from "./castCarousel.module.css";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { BlueButton } from "../../decorative/buttons/buttons";
export const CastCarousel = (props) => {
  const { items } = props;
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    arrows: false,
    className: classes.slider,
  };
  let location = useLocation();
  let navigate = useNavigate();
  return (
    <div className={classes.carousel}>
      <Slider {...settings}>
        {items.map((item) => {
          return (
            <div className={classes.sliderElement}>
              <img
                className={classes.sliderImage}
                src={`https://image.tmdb.org/t/p/original${item.profile_path}`}
                alt={""}
              />
              <h3
                className={classes.sliderName}
                // onClick={() => navigate(`${location.pathname}/cast_crew`)}
              >
                {item.name}
              </h3>
              <h3 className={classes.sliderCharacter}>{item.character}</h3>
            </div>
          );
        })}
        <BlueButton
          text={"View full crew"}
          onClick={() => navigate(`${location.pathname}/cast_crew`)}
        />
      </Slider>
    </div>
  );
};
