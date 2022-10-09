/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import classes from "./typeExpanded.module.css";
import poster_placeholder from "./../../assets/no_poster.png";

import {
  getPopularMovies,
  getTopMovies,
  getUpcomingMovies,
} from "./../../http";
import { setCurrentPage } from "./../../store/reducers/moviesReducer";
import { useDispatch } from "react-redux";
import { createPages } from "./../../helpers/pagesCreator";
import Preloader from "./../decorative/preloader/preloader";
import LazyLoad from "react-lazyload";

export const TypeExpanded = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let isFetching = useSelector(
    (state) => state.movies.searchResults.isFetching
  );
  let currentPage = useSelector(
    (state) => state.movies.searchResults.currentPage
  );
  let type = useParams()["*"];

  let items;
  if (type === "popular") {
    items = useSelector((state) => state.movies.popularMovies);
  } else if (type === "top_rated") {
    items = useSelector((state) => state.movies.topMovies);
  } else if (type === "upcoming") {
    items = useSelector((state) => state.movies.upcomingMovies);
  }

  const api_key = process.env.REACT_APP_MOVIES_API_KEY;
  let totalPages = useSelector(
    (state) => state.movies.searchResults.totalPages
  );
  useEffect(() => {
    if (type === "popular") {
      dispatch(getPopularMovies(api_key, currentPage));
    } else if (type === "top_rated") {
      dispatch(getTopMovies(api_key, currentPage));
    } else if (type === "upcoming") {
      dispatch(getUpcomingMovies(api_key, currentPage));
    }
  }, [api_key, currentPage, dispatch, type]);
  let pages = [];

  createPages(pages, totalPages, currentPage);
  debugger;
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>More results for {type} movies</h1>
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
                    navigate(
                      `/react-training/movies/movies/page/${item.id}/${item.title}`
                    )
                  }
                  className={classes.itemImage}
                  alt={""}
                  src={
                    item.poster_path !== null
                      ? `https://image.tmdb.org/t/p/original${item.poster_path}`
                      : poster_placeholder
                  }
                />
              </LazyLoad>

              <h3 className={classes.itemTitle}>{item.title}</h3>

              <div>
                <div className={classes.itemInfo}>
                  <h3 className={classes.itemPopularity}>
                    {item.vote_average !== 0
                      ? `${item.vote_average}/10`
                      : "No rating"}
                  </h3>
                  <h3 className={classes.itemYear}>
                    {item.release_date
                      ? item.release_date.slice(0, 4)
                      : "No year"}
                  </h3>
                  <h3 className={classes.itemNsfw}>
                    {item.adult ? "18+" : "16+"}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
