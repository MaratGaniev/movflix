import React, { useEffect } from "react";
import classes from "./catalogueMain.module.css";
import SmallCarousel from "../carousels/smallCarousel/smallCarousel";
import FullscreenCarousel from "../carousels/fullscreenCarousel/fullscreenCarousel";
import MediumCarousel from "../carousels/mediumCarousel/mediumCarousel";
import SearchBar from "../searchBar/searchBar";
import { getMainPageMovies } from "../../http";
import { useDispatch, useSelector } from "react-redux/es/exports";
import Preloader from "../decorative/preloader/preloader";
import { useNavigate } from "react-router";

export const CatalogueMain = () => {
  const api_key = process.env.REACT_APP_MOVIES_API_KEY;
  const dispatch = useDispatch();
  let isFetching = useSelector((state) => state.movies.isFetching);

  useEffect(() => {
    dispatch(getMainPageMovies(api_key));
  }, [api_key, dispatch]);
  let navigate = useNavigate();

  const items2 = useSelector((state) => state.movies.latestMovies);
  const items3 = useSelector((state) => state.movies.topMovies);
  const items1 = useSelector((state) => state.movies.popularMovies);
  const items4 = useSelector((state) => state.movies.upcomingMovies);

  return (
    <div className={classes.mainContainer}>
      {isFetching === true ? (
        <Preloader />
      ) : (
        <div>
          <FullscreenCarousel items={items2} />
          <SmallCarousel
            items={items3}
            title={"Top Rated"}
            onClick={() => navigate(`/movflix/type/top_rated`)}
          />
          <MediumCarousel
            items={items1}
            title={"Trending"}
            onClick={() => navigate(`/movflix/type/popular`)}
          />
          <SearchBar />
          <SmallCarousel
            items={items4}
            title={"Upcoming"}
            onClick={() => navigate(`/movflix/type/upcoming`)}
            autoplay={true}
          />
        </div>
      )}
    </div>
  );
};
