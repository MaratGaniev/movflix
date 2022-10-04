import React from "react";
import classes from "./smallCarousel.module.css";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BlueButton } from "./../../decorative/buttons/buttons";

export default function SmallCarousel(props) {
  const { items, title, variant, onClick, type, autoplay } = props;
  const [isPointMoved, setIsPointMoved] = useState(false);

  let navigate = useNavigate();
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    arrows: false,
    className: classes.slider,
    autoplay: autoplay,
    focusOnChange: false,
  };

  return (
    <div className={classes.carousel}>
      <h1 className={variant === "light" ? classes.titleLight : classes.title}>
        {title}
      </h1>
      <Slider {...settings}>
        {items.map((item) => {
          return (
            <div className={classes.sliderElement}>
              <img
                className={classes.sliderThumb}
                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                alt={item.title}
                onPointerDown={() => {
                  setIsPointMoved(false);
                }}
                onPointerMove={() => {
                  setIsPointMoved(true);
                }}
                onPointerUp={() => {
                  if (isPointMoved) {
                    setIsPointMoved(true);
                    return;
                  }

                  type === "show"
                    ? navigate(`/movflix/shows/page/${item.id}/${item.name}`)
                    : navigate(`/movflix/movies/page/${item.id}/${item.title}`);
                }}
              />

              <h1
                className={
                  variant === "light"
                    ? classes.sliderTitleLight
                    : classes.sliderTitle
                }
              >
                {type === "show" ? item.name : item.title}
              </h1>
              <div className={classes.sliderInfo}>
                <h3 className={classes.sliderGenre}>{`${
                  Math.round(item.vote_average * 10) / 10
                }/10`}</h3>
                <h3 className={classes.sliderYear}>
                  {type === "show"
                    ? item.first_air_date.slice(0, 4)
                    : item.release_date.slice(0, 4)}
                </h3>
                <h3 className={classes.sliderNsfw}>
                  {item.adult ? "18+" : "16+"}
                </h3>
              </div>
            </div>
          );
        })}
        <BlueButton text={"View more"} onClick={onClick} />
      </Slider>
    </div>
  );
}
