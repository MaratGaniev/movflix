import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import classes from "./showPage.module.css";
import background from "./../../assets/background.jpg";
import { ReviewCarousel } from "../carousels/reviewCarousel/reviewCarousel";
import { DetailsBlock } from "../detailsBlock/detailsBlock";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentShow } from "../../http";
import { List } from "../decorative/icons/list";
import { Heart } from "../decorative/icons/heart";
import { Bookmark } from "../decorative/icons/bookmark";
import { Star } from "../decorative/icons/star";
import { get_movie_popularity } from "./../../helpers/prettifyPopularity";
import Preloader from "../decorative/preloader/preloader";
import SmallCarousel from "../carousels/smallCarousel/smallCarousel";
import { get_date } from "./../../helpers/prettifyDate";
import { get_season_date } from "./../../helpers/prettifyDate";
import { get_show_duration } from "./../../helpers/getShowDuration";
import { CastCarousel } from "../carousels/castCarousel/castCarousel";

export const ShowPage = () => {
  let dispatch = useDispatch();
  let params = useParams();
  let navigate = useNavigate();
  let show_id = params.id;
  let location = useLocation();
  const currentShow = useSelector((state) => state.movies.currentShow);
  let seasons = useSelector((state) => state.movies.currentShow.seasons);
  let lastSeason = seasons.slice(-1)[0];

  const api_key = process.env.REACT_APP_MOVIES_API_KEY;

  let isFetching = useSelector((state) => state.movies.isFetching);

  useEffect(() => {
    dispatch(getCurrentShow(api_key, show_id));
  }, [api_key, dispatch, show_id]);

  return (
    <div className={classes.wrapper}>
      {isFetching ? (
        <Preloader />
      ) : (
        <div>
          <div className={classes.container}>
            <img
              className={classes.backgroundImage}
              src={background}
              alt={background}
            />
            <div className={classes.content}>
              <div className={classes.poster}>
                <img
                  className={classes.posterImage}
                  src={`https://image.tmdb.org/t/p/original${currentShow.poster_path}`}
                  alt={""}
                />
              </div>
              <div className={classes.about}>
                <h3 className={classes.movieTitle}>{currentShow.name}</h3>
                <div className={classes.misc}>
                  {currentShow.ratings.length === 0 ? null : (
                    <h4 className={classes.ageRating}>
                      {currentShow.ratings.map((rating) => rating.rating)}
                    </h4>
                  )}

                  <h4 className={classes.releaseDate}>
                    {get_date(currentShow.first_air_date)}
                  </h4>
                  <div className={classes.genres}>
                    {currentShow.genres.map((item) => (
                      <button className={classes.genre} value={item.id}>
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={classes.durationInfo}>
                  <h4 className={classes.duration}>
                    {Array.isArray(currentShow.episode_run_time)
                      ? get_show_duration(
                          currentShow.episode_run_time[0],
                          currentShow.number_of_episodes
                        )
                      : get_show_duration(
                          currentShow.episode_run_time,
                          currentShow.number_of_episodes
                        )}{" "}
                    total
                  </h4>
                  <h4 className={classes.episodes}>
                    {currentShow.number_of_episodes} episodes
                  </h4>
                  <h4 className={classes.seasons}>
                    {currentShow.number_of_seasons} seasons
                  </h4>
                </div>
                <div className={classes.ratings}>
                  <h4 className={classes.ratingNumber}>
                    {get_movie_popularity(currentShow.vote_average)}%
                  </h4>
                  <h4 className={classes.ratingTitle}>User score</h4>
                  <List className={classes.actionButton} />
                  <Heart className={classes.actionButton} />
                  <Bookmark className={classes.actionButton} />
                  <Star className={classes.actionButton} />
                </div>

                <div className={classes.info}>
                  <h4 className={classes.tagline}>{currentShow.tagline}</h4>
                  <h4 className={classes.descriptionText}>Overview</h4>
                  <h4 className={classes.description}>
                    {currentShow.overview}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          {currentShow.reviews.length === 0 ? null : (
            <ReviewCarousel items={currentShow.reviews} />
          )}

          <div className={classes.details}>
            <div>
              <div className={classes.lastSeasonBlock}>
                <h3 className={classes.lastSeasonHeader}>Last season</h3>
                <div className={classes.lastSeason}>
                  <img
                    className={classes.lastSeasonImage}
                    src={`https://image.tmdb.org/t/p/original${lastSeason.poster_path}`}
                    alt={""}
                  />
                  <div className={classes.lastSeasonInfo}>
                    <div>
                      <h4 className={classes.lastSeasonTitle}>
                        {lastSeason.name}
                      </h4>
                      <div className={classes.lastSeasonMisc}>
                        <h3 className={classes.lastSeasonYear}>
                          {lastSeason.air_date
                            ? lastSeason.air_date.slice(0, 4)
                            : "No year"}
                        </h3>
                        <h3 className={classes.lastSeasonEpisodes}>
                          {lastSeason.episode_count} episodes
                        </h3>
                      </div>
                    </div>

                    <p className={classes.lastSeasonOverview}>
                      {lastSeason.overview
                        ? lastSeason.overview
                        : `Season ${lastSeason.season_number} of ${
                            currentShow.name
                          } premiered on ${get_season_date(
                            lastSeason.air_date
                          )}.`}
                    </p>
                  </div>
                </div>
                <button
                  className={classes.lastSeasonFooter}
                  onClick={() => navigate(`${location.pathname}/seasons`)}
                >
                  View all seasons
                </button>
              </div>
              <div className={classes.castBlock}>
                <h3 className={classes.castHeader}>The cast of the series</h3>
                <CastCarousel items={currentShow.credits.cast.slice(0, 11)} />
              </div>
            </div>

            <DetailsBlock
              items={{
                original_title: currentShow.original_name,
                status: currentShow.status,

                keywords: currentShow.keywords,
                homepage: currentShow.homepage,
                ids: currentShow.external_ids,
                type: currentShow.type,
                tv_nets: currentShow.networks,
              }}
              variant="show"
            />
          </div>

          <SmallCarousel
            items={currentShow.similar}
            title="Similar shows"
            variant="light"
            type="show"
            autoplay={false}
            onClick={() =>
              navigate(`/movflix/categories/shows/similar/${currentShow.id}`)
            }
          />
        </div>
      )}
    </div>
  );
};
