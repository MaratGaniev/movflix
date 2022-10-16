import React from "react";
import classes from "./smallCarousel.module.css";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { BlueButton } from "./../../decorative/buttons/buttons";
import { genres } from "../../../genres";
import { Poster } from "../../poster/poster";

export default function SmallCarousel(props) {
  const { items, title, variant, onClick, type, autoplay } = props;

  let navigate = useNavigate();
  var settings = {
    dots: true,
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
            <div className={classes.sliderElement} key={item.id}>
              <Poster
                image_path={item.poster_path}
                onClick={() =>
                  type === "show"
                    ? navigate(`/movflix/shows/page/${item.id}/${item.name}`)
                    : navigate(`/movflix/movies/page/${item.id}/${item.title}`)
                }
                variant="carousel-small"
              />

              <h1
                className={
                  variant === "light"
                    ? classes.sliderTitleLight
                    : classes.sliderTitle
                }
                onClick={() =>
                  type === "show"
                    ? navigate(`/movflix/shows/page/${item.id}/${item.name}`)
                    : navigate(`/movflix/movies/page/${item.id}/${item.title}`)
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
                <h3 className={classes.sliderNsfw}>{item.vote_count} votes</h3>
              </div>

              <div className={classes.genres}>
                {item.genre_ids.slice(0, 3).map((genre) => (
                  <span key={genre.id} className={classes.genre}>
                    {genres[genre]}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
        <BlueButton text={"View more"} onClick={onClick} />
      </Slider>
    </div>
  );
}
