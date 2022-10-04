import React from "react";
import { useState } from "react";
import classes from "./mediumCarousel.module.css";
import Slider from "react-slick";
import { useNavigate } from "react-router";
import { BlueButton } from "./../../decorative/buttons/buttons";

const MediumCarousel = (props) => {
  const { title, items, onClick } = props;
  const [isPointMoved, setIsPointMoved] = useState(false);

  let navigate = useNavigate();
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    arrows: false,
    className: classes.slider,
    focusOnChange: false,
  };

  return (
    <div className={classes.carousel}>
      <h1 className={classes.title}>{title}</h1>
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

                  navigate(`/movflix/movies/page/${item.id}/${item.title}`);
                }}
              />
              <h1 className={classes.sliderTitle}>{item.title}</h1>
              <div className={classes.sliderInfo}>
                <h3
                  className={classes.sliderVote}
                >{`${item.vote_average}/10`}</h3>
                <h3 className={classes.sliderYear}>
                  {item.release_date.slice(0, 4)}
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
};

export default MediumCarousel;
