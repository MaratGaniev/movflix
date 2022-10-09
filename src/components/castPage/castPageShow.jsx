import React from "react";
import { useParams } from "react-router-dom";
import classes from "./castPage.module.css";
import { useEffect } from "react";
import { getShowSearchCrew } from "../../http";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import person_placeholder from "./../../assets/person_placeholder.jpg";

const CastPageShow = () => {
  let dispatch = useDispatch();
  let params = useParams();
  const api_key = process.env.REACT_APP_MOVIES_API_KEY;
  let navigate = useNavigate();
  let title = useSelector((state) => state.movies.currentShow.name);
  let date = useSelector((state) => state.movies.currentShow.first_air_date);
  let full_credits = useSelector(
    (state) => state.movies.currentShow.full_credits
  );
  let headerImage = useSelector(
    (state) => state.movies.currentShow.poster_path
  );
  useEffect(() => {
    dispatch(getShowSearchCrew(api_key, params.id));
  }, [params.id, api_key, dispatch]);

  return (
    <div className={classes.container}>
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
      <div className={classes.items}>
        <div className={classes.castBlock}>
          <h1 className={classes.castHeader}>
            The cast of the series{" "}
            <span className={classes.grayText}>{full_credits.cast.length}</span>
          </h1>
          <div className={classes.castItems}>
            {full_credits.cast.map((person) => (
              <div className={classes.castItem}>
                <img
                  className={classes.castImage}
                  src={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/original${person.profile_path}`
                      : person_placeholder
                  }
                  alt={""}
                />
                <div className={classes.castInfo}>
                  <h3 className={classes.castName}>{person.name}</h3>
                  <ul className={classes.roles}>
                    {person.roles.map((role) =>
                      role.character ? (
                        <li className={classes.role}>
                          {role.character}
                          <span className={classes.grayText}>
                            {role.episode_count} episodes
                          </span>
                        </li>
                      ) : null
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={classes.crewBlock}>
          <h1 className={classes.crewHeader}>
            The crew of the series
            <span className={classes.grayText}>{full_credits.crew.length}</span>
          </h1>
          <div className={classes.castItems}>
            {full_credits.crew.map((person) => (
              <div className={classes.castItem}>
                <img
                  className={classes.castImage}
                  src={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/original${person.profile_path}`
                      : person_placeholder
                  }
                  alt={""}
                />
                <div className={classes.castInfo}>
                  <h3 className={classes.castName}>{person.name}</h3>
                  <ul className={classes.jobs}>
                    {person.jobs.map((job) =>
                      job.job ? (
                        <li className={classes.role}>
                          {job.job}
                          <span className={classes.grayText}>
                            {job.episode_count} episodes
                          </span>
                        </li>
                      ) : null
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CastPageShow;
