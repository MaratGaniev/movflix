import React from "react";
import classes from "./poster.module.css";
import { useState } from "react";

export const Poster = (props) => {
  let { variant, onClick, image_path } = props;
  const [isPointMoved, setIsPointMoved] = useState(false);
  return (
    <img
      src={`https://image.tmdb.org/t/p/original${image_path}`}
      style={
        variant === "carousel-small"
          ? { width: "230px", height: "350px" }
          : variant === "carousel-medium"
          ? { width: "300px", height: "450px" }
          : variant === "poster-page"
          ? { width: "300px", height: "450px", borderRadius: "10px" }
          : null
      }
      className={variant !== "poster-page" ? classes.image : null}
      alt={""}
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
        onClick();
      }}
    />
  );
};
