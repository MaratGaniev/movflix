import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getSearchEpisodes } from "./../../http";
import classes from "./episodesPage.module.css";
import { useEffect } from "react";
import { get_season_date } from "./../../helpers/prettifyDate";
import Preloader from "./../decorative/preloader/preloader";

const EpisodesPage = () => {
  let params = useParams();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let currentSeason = useSelector(
    (state) => state.movies.currentShow.currentSeason
  );
  const api_key = process.env.REACT_APP_MOVIES_API_KEY;
  let isFetching = useSelector(
    (state) => state.movies.searchResults.isFetching
  );
  useEffect(() => {
    dispatch(getSearchEpisodes(api_key, params.id, params.season));
  }, []);

  return (
    <div>
      {isFetching ? (
        <Preloader />
      ) : (
        <div>
          {" "}
          <div className={classes.header}>
            <img
              className={classes.headerImage}
              src={`https://image.tmdb.org/t/p/original${currentSeason.poster_path}`}
              alt={""}
            />
            <div>
              <h3 className={classes.headerTitle}>
                {currentSeason.name} ({currentSeason.air_date.slice(0, 4)})
              </h3>
              <button
                className={classes.backButton}
                onClick={() => navigate(-1)}
              >
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
                Back to seasons
              </button>
            </div>
          </div>
          <h3 className={classes.episodesCount}>
            Episodes{" "}
            <span className={classes.grayText}>
              {currentSeason.episodes.length}
            </span>
          </h3>
          <div className={classes.episodes}>
            {currentSeason.episodes.map((episode) => (
              <div className={classes.episode}>
                <img
                  src={`https://image.tmdb.org/t/p/original${episode.still_path}`}
                  alt={""}
                  className={classes.episodeImage}
                />
                <div>
                  <div className={classes.episodeInfo}>
                    <h3 className={classes.episodeTitle}>
                      <span className={classes.episodeNumber}>
                        {episode.episode_number}
                      </span>
                      {episode.name}
                    </h3>

                    <h3 className={classes.episodeMisc}>
                      {get_season_date(episode.air_date)}
                    </h3>
                  </div>
                  <p className={classes.episodeDescription}>
                    {episode.overview}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EpisodesPage;
