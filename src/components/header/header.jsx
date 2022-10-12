import React from "react";
import classes from "./header.module.css";
import logo from "./../../assets/logo100.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Header = () => {
  let navigate = useNavigate();
  const [query, setQuery] = useState("");

  return (
    <div className={classes.container}>
      <div className={classes.items}>
        <div
          className={classes.logoBlock}
          onClick={() => navigate("/movflix/")}
        >
          <img src={logo} className={classes.logo} alt="" />
          <h3 className={classes.logoText}>Movflix</h3>
        </div>
        <div className={classes.dropDown}>
          <button className={`${classes.link} ${classes.withDropdown}`}>
            Movies
          </button>
          <div className={classes.dropDownContent}>
            <button
              className={classes.linkDropdown}
              onClick={() => navigate("/movflix/categories/movies/popular")}
            >
              Popular
            </button>
            <button
              className={classes.linkDropdown}
              onClick={() => navigate("/movflix/categories/movies/upcoming")}
            >
              Upcoming
            </button>
            <button className={classes.linkDropdown}>Latest</button>
            <button
              className={classes.linkDropdown}
              onClick={() => navigate("/movflix/categories/movies/top rated")}
            >
              Best
            </button>
          </div>
        </div>

        <div className={classes.dropDown}>
          <button className={`${classes.link} ${classes.withDropdown}`}>
            Shows
          </button>
          <div className={classes.dropDownContent}>
            <button
              className={classes.linkDropdown}
              onClick={() => navigate("/movflix/categories/shows/popular")}
            >
              Trending
            </button>
            <button
              className={classes.linkDropdown}
              onClick={() => navigate("/movflix/categories/shows/latest")}
            >
              On air now
            </button>
            <button
              className={classes.linkDropdown}
              onClick={() => navigate("/movflix/categories/shows/top rated")}
            >
              Best
            </button>
          </div>
        </div>

        <div className={classes.dropDown}>
          <button className={`${classes.link} ${classes.withDropdown}`}>
            Persons
          </button>
          <div className={classes.dropDownContent}>
            <button className={classes.linkDropdown}>Popular</button>
          </div>
        </div>
      </div>
      <div className={classes.items}>
        <input
          type="text"
          placeholder="Search..."
          className={classes.searchBar}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className={classes.submitButton}
          onClick={() => navigate(`/movflix/search/${query}`)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="white"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
      </div>
      <div className={classes.items}>
        <button className={classes.link}>My list</button>
        <button className={classes.link}>Credits</button>
        <button className={classes.link}>About</button>
      </div>
    </div>
  );
};
