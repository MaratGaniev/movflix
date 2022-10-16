import React, { useEffect } from "react";
import { useParams } from "react-router";
import classes from "./moviePage.module.css";
import background from "./../../assets/background.jpg";
import { ReviewCarousel } from "../carousels/reviewCarousel/reviewCarousel";
import { DetailsBlock } from "../detailsBlock/detailsBlock";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentMovie } from "../../http";
import { List } from "../decorative/icons/list";
import { Heart } from "../decorative/icons/heart";
import { Bookmark } from "../decorative/icons/bookmark";
import { Star } from "../decorative/icons/star";
import { get_movie_popularity } from "../../helpers/prettifyPopularity";
import Preloader from "../decorative/preloader/preloader";
import SmallCarousel from "../carousels/smallCarousel/smallCarousel";
import { get_duration } from "../../helpers/getMovieDuration";
import { get_date } from "../../helpers/prettifyDate";
import poster_placeholder from "./../../assets/no_poster.png";
import { CastCarousel } from "../carousels/castCarousel/castCarousel";
import { useNavigate } from "react-router";
import { Header } from "../header/header";
import { Poster } from "../poster/poster";

export const MoviePage = () => {
  let params = useParams()["*"].split("/");
  let search_title = params[1];
  let movie_id = params[0];
  let navigate = useNavigate();
  const currentMovie = useSelector((state) => state.movies.currentMovie);

  const api_key = process.env.REACT_APP_MOVIES_API_KEY;
  const omdb_api_key = "aee3d546";
  const dispatch = useDispatch();
  let isFetching = useSelector((state) => state.movies.isFetching);
  useEffect(() => {
    dispatch(getCurrentMovie(api_key, movie_id, search_title, omdb_api_key));
  }, [movie_id, search_title, api_key, dispatch]);

  return (
    <>
      <Header />
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
                  <Poster
                    image_path={
                      currentMovie.poster_path
                        ? currentMovie.poster_path
                        : poster_placeholder
                    }
                    variant="poster-page"
                    onClick={() => {
                      return;
                    }}
                  />
                </div>
                <div className={classes.about}>
                  <h3 className={classes.movieTitle}>{currentMovie.title}</h3>
                  <div className={classes.misc}>
                    {currentMovie.rated !== "N/A" &&
                    currentMovie.rated !== null ? (
                      <h4 className={classes.ageRating}>
                        {currentMovie.rated}
                      </h4>
                    ) : null}

                    <h4 className={classes.releaseDate}>
                      {get_date(currentMovie.release_date)}
                    </h4>
                    <div className={classes.genres}>
                      {currentMovie.genres.map((item) => (
                        <button className={classes.genre} value={item.id}>
                          {item.name}
                        </button>
                      ))}
                    </div>

                    <h4 className={classes.duration}>
                      {get_duration(currentMovie.runtime)}
                    </h4>
                  </div>
                  <div className={classes.ratings}>
                    <h4 className={classes.ratingNumber}>
                      {get_movie_popularity(currentMovie.vote_average)}%
                    </h4>
                    <h4 className={classes.ratingTitle}>User score</h4>
                    <List className={classes.actionButton} />
                    <Heart className={classes.actionButton} />
                    <Bookmark className={classes.actionButton} />
                    <Star className={classes.actionButton} />
                  </div>

                  <div className={classes.info}>
                    <h4 className={classes.tagline}>{currentMovie.tagline}</h4>
                    <h4 className={classes.descriptionText}>Overview</h4>
                    <h4 className={classes.description}>
                      {currentMovie.overview}
                    </h4>
                  </div>
                  {currentMovie.director === undefined &&
                  currentMovie.actors === undefined &&
                  currentMovie.writer === undefined ? null : (
                    <div className={classes.producers}>
                      <div className={classes.producer}>
                        <h3 className={classes.name}>
                          {currentMovie.director}
                        </h3>
                        <h3 className={classes.job}>Director</h3>
                      </div>
                      <div className={classes.producer}>
                        <h3 className={classes.name}>{currentMovie.writer}</h3>
                        <h3 className={classes.job}>Writer</h3>
                      </div>
                      <div className={classes.producer}>
                        <h3 className={classes.name}>{currentMovie.actors}</h3>
                        <h3 className={classes.job}>Actors</h3>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {currentMovie.reviews.length === 0 ? null : (
              <ReviewCarousel items={currentMovie.reviews} />
            )}

            <DetailsBlock
              items={{
                original_title: currentMovie.original_title,
                status: currentMovie.status,
                languages: currentMovie.language,
                budget: currentMovie.budget,
                revenue: currentMovie.revenue,
                keywords: currentMovie.keywords,
                homepage: currentMovie.homepage,
                ids: currentMovie.external_ids,
                awards: currentMovie.awards,
              }}
              type="person"
            />
            <div className={classes.castBlock}>
              <h3 className={classes.castHeader}>The cast of the movie</h3>
              <CastCarousel items={currentMovie.credits.cast.slice(0, 11)} />
            </div>
            {currentMovie.similar.length === 0 ? null : (
              <SmallCarousel
                items={currentMovie.similar}
                title="Similar"
                variant="light"
                autoplay={false}
                onClick={() =>
                  navigate(
                    `/movflix/categories/movies/similar/${currentMovie.id}`
                  )
                }
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};
