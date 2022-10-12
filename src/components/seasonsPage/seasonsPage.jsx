import React from "react";
import { useSelector } from "react-redux";
import classes from "./seasonsPage.module.css";
import { get_season_date } from "./../../helpers/prettifyDate";
import { useLocation, useNavigate } from "react-router";
import { Header } from "../header/header";

export const SeasonsPage = () => {
  let seasons = useSelector((state) => state.movies.currentShow.seasons);
  let navigate = useNavigate();
  let title = useSelector((state) => state.movies.currentShow.name);
  let date = useSelector((state) => state.movies.currentShow.first_air_date);
  let location = useLocation();
  let headerImage = useSelector(
    (state) => state.movies.currentShow.poster_path
  );
  return (
    <div>
      <div className={classes.header}>
        <img
          className={classes.headerImage}
          src={`https://image.tmdb.org/t/p/original${headerImage}`}
          alt={""}
        />
        <div>
          <h3 className={classes.headerTitle}>
            {title} ({date.slice(0, 4)})
          </h3>
          <button className={classes.backButton} onClick={() => navigate(-1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="currentColor"
              class="bi bi-arrow-left-short"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
              />
            </svg>
            Back to show
          </button>
        </div>
      </div>
      <div className={classes.seasons}>
        {seasons.map((season) => (
          <div className={classes.season}>
            <img
              src={`https://image.tmdb.org/t/p/original${season.poster_path}`}
              alt={""}
              className={classes.seasonImage}
            />
            <div className={classes.seasonInfo}>
              <button
                className={classes.seasonTitle}
                onClick={() =>
                  navigate(`${location.pathname}/${season.season_number}`)
                }
              >
                {season.name}
              </button>
              <h3 className={classes.seasonMisc}>
                {season.air_date ? season.air_date.slice(0, 4) : "No year"} |{" "}
                {season.episode_count} episodes{" "}
              </h3>
              <p className={classes.seasonDescription}>
                {season.overview
                  ? season.overview
                  : `Season ${
                      season.season_number
                    } of ${title} premiered on ${get_season_date(
                      season.air_date
                    )}.`}
                {}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
