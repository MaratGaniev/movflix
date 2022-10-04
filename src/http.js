import {
  setLatestMovies,
  setPopularMovies,
  setTopMovies,
  setUpcomingMovies,
  setCurrentMovie,
  setDetails,
  setSearchMovies,
  setSearchTv,
  setSearchPersons,
  setMoviesFetch,
  setShowId,
  setShowDetails,
  setCurrentShow,
  setCurrentSeason,
} from "./store/reducers/moviesReducer";

export const getMainPageMovies = (API_KEY) => async (dispatch) => {
  dispatch(setMoviesFetch(true));
  await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1` //Latest movies
  )
    .then((res) => res.json())
    .then((result) => {
      dispatch(setLatestMovies(result.results));
    });

  await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1` //Top movies
  )
    .then((res) => res.json())
    .then((result) => {
      dispatch(setTopMovies({ topMovies: result.results }));
    });
  await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1` //Popular movies
  )
    .then((res) => res.json())
    .then((result) => {
      dispatch(setPopularMovies({ popularMovies: result.results }));
    });

  await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1` //Upcoming movies
  )
    .then((res) => res.json())
    .then((result) => {
      dispatch(setUpcomingMovies({ upcomingMovies: result.results }));
    });
  dispatch(setMoviesFetch(false));
};

export const getNewMovies = (API_KEY) => async (dispatch) => {
  await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
  )
    .then((res) => res.json())
    .then((result) => {
      dispatch(setLatestMovies(result.results));
    });
};

export const getTopMovies = (API_KEY, currentPage) => async (dispatch) => {
  dispatch(setMoviesFetch(true));
  await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${currentPage}`
  )
    .then((res) => res.json())
    .then((result) => {
      dispatch(
        setTopMovies({
          topMovies: result.results,
          totalPages: result.total_pages,
        })
      );
    });
  dispatch(setMoviesFetch(false));
};

export const getPopularMovies = (API_KEY, currentPage) => async (dispatch) => {
  dispatch(setMoviesFetch(true));
  await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`
  )
    .then((res) => res.json())
    .then((result) => {
      dispatch(
        setPopularMovies({
          popularMovies: result.results,
          totalPages: result.total_pages,
        })
      );
    });
  dispatch(setMoviesFetch(false));
};

export const getUpcomingMovies = (API_KEY, currentPage) => async (dispatch) => {
  dispatch(setMoviesFetch(true));
  await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${currentPage}`
  )
    .then((res) => res.json())
    .then((result) => {
      dispatch(
        setUpcomingMovies({
          upcomingMovies: result.results,
          totalPages: result.total_pages,
        })
      );
    });
  dispatch(setMoviesFetch(false));
};

export const getCurrentMovie =
  (tmdb_api_key, movie_id, title, omdb_api_key) => async (dispatch) => {
    dispatch(setMoviesFetch(true));
    await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${tmdb_api_key}&language=en-US&append_to_response=keywords,reviews,external_ids,similar`
    )
      .then((res) => res.json())
      .then((result) => {
        dispatch(
          setCurrentMovie({
            currentMovie: result,
            keywords: result.keywords.keywords,
            socials: result.external_ids,
            reviews: result.reviews.results,
            similar: result.similar.results,
          })
        );
      });
    await fetch(`https://www.omdbapi.com/?t=${title}&apikey=${omdb_api_key}`)
      .then((res) => res.json())
      .then((result) => {
        dispatch(
          setDetails({
            awards: result.Awards,
            director: result.Director,
            writer: result.Writer,
            actors: result.Actors,
            rated: result.Rated,
            language: result.Language,
          })
        );
      });

    dispatch(setMoviesFetch(false));
  };

export const getSearchMovies = (API_KEY, query, page) => async (dispatch) => {
  dispatch(setMoviesFetch(true));
  await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&page=${page}`
  )
    .then((res) => res.json())
    .then((result) => {
      dispatch(
        setSearchMovies({
          movies: result.results,
          totalPages: result.total_pages,
        })
      );
    });
  dispatch(setMoviesFetch(false));
};

export const getSearchResults = (API_KEY, query, page) => async (dispatch) => {
  dispatch(setMoviesFetch(true));
  await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&page=${page}`
  )
    .then((res) => res.json())
    .then((result) => {
      dispatch(
        setSearchMovies({
          movies: result.results,
          query: query,
        })
      );
    });
  await fetch(
    `https://api.themoviedb.org/3/search/tv?query=${query}&api_key=${API_KEY}&page=1`
  )
    .then((res) => res.json())
    .then((result) => {
      dispatch(setSearchTv({ shows: result.results }));
    });

  await fetch(
    `https://api.themoviedb.org/3/search/person?query=${query}&api_key=${API_KEY}&page=1`
  )
    .then((res) => res.json())
    .then((result) => {
      dispatch(setSearchPersons({ persons: result.results }));
    });
  dispatch(setMoviesFetch(false));
};

export const getSearchTv =
  (API_KEY, query, currentPage) => async (dispatch) => {
    dispatch(setMoviesFetch(true));
    await fetch(
      `https://api.themoviedb.org/3/search/tv?query=${query}&api_key=${API_KEY}&page=${currentPage}`
    )
      .then((res) => res.json())
      .then((result) => {
        dispatch(
          setSearchTv({
            shows: result.results,
            totalPages: result.total_pages,
          })
        );
      });
    dispatch(setMoviesFetch(false));
  };

export const getSearchPersons =
  (API_KEY, query, currentPage) => async (dispatch) => {
    dispatch(setMoviesFetch(true));

    await fetch(
      `https://api.themoviedb.org/3/search/person?query=${query}&api_key=${API_KEY}&page=${currentPage}`
    )
      .then((res) => res.json())
      .then((result) => {
        dispatch(
          setSearchPersons({
            persons: result.results,
            totalPages: result.total_pages,
          })
        );
      });
    dispatch(setMoviesFetch(false));
  };

export const getShowId = (API_KEY, show_id) => async (dispatch) => {
  await fetch(
    `https://api.themoviedb.org/3/tv/${show_id}/external_ids?api_key=${API_KEY}&language=en-US`
  )
    .then((res) => res.json())
    .then((result) => {
      dispatch(setShowId(result.imdb_id));
    });
};

export const getCurrentShow = (tmdb_api_key, show_id) => async (dispatch) => {
  dispatch(setMoviesFetch(true));
  await fetch(
    `https://api.themoviedb.org/3/tv/${show_id}?api_key=${tmdb_api_key}&language=en-US&append_to_response=keywords,external_ids,reviews,similar`
  )
    .then((res) => res.json())
    .then((result) => {
      dispatch(
        setCurrentShow({
          currentShow: result,
          keywords: result.keywords.results,
          socials: result.external_ids,
          reviews: result.reviews.results,
          genres: result.genres,
          similar: result.similar.results,
        })
      );
    });

  dispatch(setMoviesFetch(false));
};

export const getCurrentShowDetails =
  (omdb_api_key, omdb_id) => async (dispatch) => {
    dispatch(setMoviesFetch(true));
    await fetch(`https://www.omdbapi.com/?i=${omdb_id}&apikey=${omdb_api_key}`)
      .then((res) => res.json())
      .then((result) => {
        dispatch(
          setShowDetails({
            awards: result.Awards,
            director: result.Director,
            writer: result.Writer,
            actors: result.Actors,
            rated: result.Rated,
            language: result.Language,
            year: result.Year,
          })
        );
      });
    dispatch(setMoviesFetch(false));
  };

export const getSearchEpisodes =
  (API_KEY, tv_id, season_number) => async (dispatch) => {
    dispatch(setMoviesFetch(true));

    await fetch(
      `https://api.themoviedb.org/3/tv/${tv_id}/season/${season_number}?api_key=${API_KEY}&language=en-US`
    )
      // http://api.themoviedb.org/3/tv/15260/season/1?api_key=be1439869705c85e4dc324a3a7ab804f&language=en-US
      .then((res) => res.json())
      .then((result) => {
        dispatch(
          setCurrentSeason({
            episodes: result.episodes,
            name: result.name,
            poster_path: result.poster_path,
            air_date: result.air_date,
            season_number: result.season_number,
          })
        );
      });
    dispatch(setMoviesFetch(false));
  };
