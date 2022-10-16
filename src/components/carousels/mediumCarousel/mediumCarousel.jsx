import React from "react";
import classes from "./mediumCarousel.module.css";
import Slider from "react-slick";
import { useNavigate } from "react-router";
import { BlueButton } from "./../../decorative/buttons/buttons";
import { genres } from "../../../genres";
import { get_date_withdot } from "../../../helpers/prettifyDate";
import { Poster } from "../../poster/poster";

const MediumCarousel = (props) => {
  const { title, items, onClick } = props;

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
            <div className={classes.sliderElement} key={item.id}>
              <Poster
                image_path={item.poster_path}
                onClick={() =>
                  navigate(`/movflix/movies/page/${item.id}/${item.title}`)
                }
                variant="carousel-medium"
              />
              <h1
                className={classes.sliderTitle}
                onClick={() =>
                  navigate(`/movflix/movies/page/${item.id}/${item.title}`)
                }
              >
                {item.title}
              </h1>
              <div className={classes.sliderInfo}>
                <h3
                  className={classes.sliderVote}
                >{`${item.vote_average}/10`}</h3>
                <h3 className={classes.sliderYear}>
                  {get_date_withdot(item.release_date)}
                </h3>
                <h3 className={classes.sliderNsfw}>{item.vote_count} votes</h3>
              </div>
              <div className={classes.genres}>
                {item.genre_ids.map((genre) => (
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
};

export default MediumCarousel;
