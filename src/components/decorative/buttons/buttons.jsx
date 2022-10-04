import React from "react";
import classes from "./buttons.module.css";

export const BlueButton = (props) => {
  return (
    <button className={classes.blueButton} onClick={props.onClick}>
      {props.text}
    </button>
  );
};
