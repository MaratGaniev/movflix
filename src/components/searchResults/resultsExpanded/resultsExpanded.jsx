/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import classes from "./resultsExpanded.module.css";
import poster_placeholder from "./../../../assets/no_poster.png";
import { get_persons_popularity } from "./../../../helpers/prettifyPopularity";
import {
  getSearchMovies,
  getSearchPersons,
  getSearchTv,
} from "./../../../http";
import { setCurrentPage } from "./../../../store/reducers/moviesReducer";
import { useDispatch } from "react-redux";
import { createPages } from "./../../../helpers/pagesCreator";
import Preloader from "./../../decorative/preloader/preloader";
import LazyLoad from "react-lazyload";

export const ResultsExpanded = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let isFetching = useSelector(
    (state) => state.movies.searchResults.isFetching
  );
  let currentPage = useSelector(
    (state) => state.movies.searchResults.currentPage
  );
  let params = useParams()["*"].split("/");
  let items;

  params[1] === "movies"
    ? (items = useSelector((state) => state.movies.searchResults.movies))
    : params[1] === "shows"
    ? (items = useSelector((state) => state.movies.searchResults.shows))
    : (items = useSelector((state) => state.movies.searchResults.persons));
  let query = params[0];
  const api_key = process.env.REACT_APP_MOVIES_API_KEY;
  let totalPages = useSelector(
    (state) => state.movies.searchResults.totalPages
  );
  useEffect(() => {
    params[1] === "movies"
      ? dispatch(getSearchMovies(api_key, query, currentPage))
      : params[1] === "shows"
      ? dispatch(getSearchTv(api_key, query, currentPage))
      : dispatch(getSearchPersons(api_key, query, currentPage));
  }, [currentPage]);
  let pages = [];

  createPages(pages, totalPages, currentPage);

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Search results for {query} </h1>
      <div className={classes.pages}>
        {pages.map((page) => (
          <button
            className={
              page === currentPage
                ? `${classes.page} ${classes.active}`
                : classes.page
            }
            onClick={() => {
              dispatch(setCurrentPage(page));
            }}
          >
            {page}
          </button>
        ))}
      </div>
      {isFetching ? (
        <Preloader />
      ) : (
        <div className={classes.items}>
          {items.map((item) => (
            <div className={classes.item}>
              <LazyLoad once>
                <img
                  onClick={() =>
                    params[1] === "movies"
                      ? navigate(
                          `/movflix/movies/page/${item.id}/${item.title}`
                        )
                      : params[1] === "shows"
                      ? navigate(`/movflix/shows/page/${item.id}/${item.name}`)
                      : null
                  }
                  className={classes.itemImage}
                  alt={""}
                  src={
                    params[1] === "persons" && item.profile_path !== null
                      ? `https://image.tmdb.org/t/p/original${item.profile_path}`
                      : item.poster_path != null
                      ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                      : poster_placeholder
                  }
                />
              </LazyLoad>

              <h3 className={classes.itemTitle}>
                {params[1] === "movies" ? item.title : item.name}
              </h3>
              {params[1] !== "persons" ? (
                <div>
                  <div className={classes.itemInfo}>
                    <h3 className={classes.itemPopularity}>
                      {item.vote_average !== 0
                        ? `${item.vote_average}/10`
                        : "No rating"}
                    </h3>
                    <h3 className={classes.itemYear}>
                      {params[1] === "movies" && item.release_date
                        ? item.release_date.slice(0, 4)
                        : params[1] === "shows" && item.first_air_date
                        ? item.first_air_date.slice(0, 4)
                        : "No year"}
                    </h3>
                    <h3 className={classes.itemNsfw}>
                      {item.adult ? "18+" : "16+"}
                    </h3>
                  </div>
                </div>
              ) : (
                <div>
                  <div className={`${classes.itemInfo} ${classes.job}`}>
                    <h3
                      className={classes.itemPopularity}
                    >{`Popularity: ${get_persons_popularity(
                      item.popularity
                    )}%`}</h3>
                    <h3 className={classes.itemJob}>
                      {item.known_for_department}
                    </h3>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
