import prettifyMoney from "../../helpers/prettifyMoney";

const SET_LATEST_MOVIES = "SET_LATEST_MOVIES";
const SET_TOP_RATED_MOVIES = "SET_TOP_RATED_MOVIES";
const SET_POPULAR_MOVIES = "SET_POPULAR_MOVIES";
const SET_UPCOMING_MOVIES = "SET_UPCOMING_MOVIES";
const SET_CURRENT_MOVIE = "SET_CURRENT_MOVIE";
const SET_CURRENT_SHOW = "SET_CURRENT_SHOW";
const SET_SEARCH_FETCHING = "SET_SEARCH_FETCHING";
const SET_SEARCH_MOVIES = "SET_SEARCH_MOVIES";
const SET_SEARCH_TV = "SET_SEARCH_TV";
const SET_SEARCH_PERSON = "SET_SEARCH_PERSON";
const SET_REVIEWS = "SET_REVIEWS";
const SET_DETAILS_MOVIE = "SET_DETAILS_MOVIE";
const SET_DETAILS_SHOW = "SET_DETAILS_SHOW";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_SIMILAR = "SET_SIMILAR_MOVIES";
const SET_SHOW_ID = "SET_SHOW_ID";
const SET_CURRENT_SEASON = "SET_CURRENT_SEASON";

const defaultStore = {
  isError: false,
  latestMovies: [],
  topMovies: [],
  popularMovies: [],
  upcomingMovies: [],
  currentMovie: {
    poster_path: "",
    title: "",
    rated: null,
    release_date: "",
    genres: [{ name: "", id: 0 }],
    keywords: [{ name: "", id: 0 }],
    reviews: [
      {
        author: "",
        content: "",
        created_at: "",
        author_details: { avatar_path: "" },
      },
    ],
    runtime: 0,
    vote_average: 0,
    tagline: "",
    overview: "",
    director: null,
    actors: null,
    writer: null,
    original_title: "",
    language: "",
    budget: 0,
    revenue: 0,
    homepage: "",
    external_ids: {
      facebook_id: "",
      twitter_id: "",
      instagram_id: "",
    },
    awards: "",
    similar: [],
  },
  currentShow: {
    poster_path: "",
    name: "",
    rated: null,
    first_air_date: "",
    genres: [{ name: "", id: 0 }],
    keywords: [{ name: "", id: 0 }],
    reviews: [
      {
        author: "",
        content: "",
        created_at: "",
        author_details: { avatar_path: "" },
      },
    ],
    episode_run_time: "",
    number_of_episodes: 0,
    number_of_seasons: 0,
    vote_average: 0,
    tagline: "",
    overview: "",
    seasons: [
      {
        name: "",
        air_date: "",
        episode_count: 0,
        overview: "",
        poster_path: "",
        season_number: 0,
        id: 0,
      },
    ],
    similar: [],
    original_name: "",
    status: "",
    homepage: "",
    external_ids: {
      facebook_id: "",
      twitter_id: "",
      instagram_id: "",
    },
    type: "",
    networks: [{ id: 0, logo_path: "" }],
    currentSeason: {
      episodes: [
        {
          air_date: "",
          episode_number: 0,
          id: 0,
          name: "",
          overview: "",
          still_path: "",
          vote_average: "",
        },
      ],
      name: "",
      poster_path: "",
      air_date: "",
      season_number: "",
    },
  },

  searchResults: {
    currentPage: 1,
    totalPages: "",
    query: "",
    movies: [],
    persons: [],
    shows: [],
    keywords: [],
    isFetching: false,
  },
};

export let moviesReducer = (state = defaultStore, action) => {
  switch (action.type) {
    case SET_CURRENT_SEASON:
      return {
        ...state,
        currentShow: {
          ...state.currentShow,
          currentSeason: {
            episodes: action.episodes,
            name: action.name,
            poster_path: action.poster_path,
            air_date: action.air_date,
            season_number: action.season_number,
          },
        },
      };
    case SET_LATEST_MOVIES:
      return { ...state, latestMovies: action.latestMovies };

    case SET_TOP_RATED_MOVIES:
      return {
        ...state,
        topMovies: action.topMovies,
        searchResults: {
          ...state.searchResults,
          totalPages: action.totalPages,
        },
      };

    case SET_POPULAR_MOVIES:
      return {
        ...state,
        popularMovies: action.popularMovies,
        searchResults: {
          ...state.searchResults,
          totalPages: action.totalPages,
        },
      };

    case SET_UPCOMING_MOVIES:
      return {
        ...state,
        upcomingMovies: action.upcomingMovies,
        searchResults: {
          ...state.searchResults,
          totalPages: action.totalPages,
        },
      };
    case SET_DETAILS_MOVIE:
      return {
        ...state,
        currentMovie: {
          ...state.currentMovie,
          awards: action.awards,
          director: action.director,
          writer: action.writer,
          actors: action.actors,
          rated: action.rated,
          language: action.language,
        },
      };
    case SET_DETAILS_SHOW:
      return {
        ...state,
        currentShow: {
          ...state.currentShow,
          awards: action.awards,
          director: action.director,
          writer: action.writer,
          actors: action.actors,
          rated: action.rated,
          language: action.language,
          year: action.year,
        },
      };

    case SET_CURRENT_MOVIE:
      return {
        ...state,
        currentMovie: {
          ...action.currentMovie,
          budget: prettifyMoney(action.currentMovie.budget),
          revenue: prettifyMoney(action.currentMovie.revenue),
          keywords: action.keywords,
          reviews: action.reviews,
          external_ids: action.socials,
          similar: action.similar,
        },
        // genres: action.genres,
        // keywords: action.keywords,
        // socials: action.socials,
      };
    case SET_CURRENT_SHOW:
      return {
        ...state,
        currentShow: {
          ...state.currentShow,
          ...action.currentShow,
          keywords: action.keywords,
          external_ids: action.external_ids,
          similar: action.similar,
          reviews: action.reviews,
        },
      };

    case SET_SEARCH_MOVIES:
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          movies: action.movies,
          query: action.query,
          totalPages: action.totalPages,
        },
      };
    case SET_SEARCH_FETCHING:
      return {
        ...state,
        searchResults: { ...state.searchResults, isFetching: action.fetch },
      };
    case SET_SEARCH_TV:
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          shows: action.shows,
          totalPages: action.totalPages,
        },
      };
    case SET_SEARCH_PERSON:
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          persons: action.persons,
          totalPages: action.totalPages,
        },
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          currentPage: action.currentPage,
        },
      };
    case SET_SIMILAR:
      return { ...state, similar: action.similar };
    case SET_SHOW_ID:
      return {
        ...state,
        currentShow: { ...state.currentShow, imdbID: action.id },
      };
    default:
      return state;
  }
};

export const setLatestMovies = (payload) => ({
  type: SET_LATEST_MOVIES,
  latestMovies: payload,
});

export const setShowId = (payload) => ({
  type: SET_SHOW_ID,
  id: payload,
});

export const setSimilarMovies = (payload) => ({
  type: SET_SIMILAR,
  similar: payload,
});

export const setMoviesFetch = (payload) => ({
  type: SET_SEARCH_FETCHING,
  fetch: payload,
});

export const setSearchMovies = (payload) => ({
  type: SET_SEARCH_MOVIES,
  movies: payload.movies,
  query: payload.query,
  totalPages: payload.totalPages,
});

export const setCurrentPage = (payload) => ({
  type: SET_CURRENT_PAGE,
  currentPage: payload,
});

export const setSearchPersons = (payload) => ({
  type: SET_SEARCH_PERSON,
  persons: payload.persons,
  totalPages: payload.totalPages,
});

export const setSearchTv = (payload) => ({
  type: SET_SEARCH_TV,
  shows: payload.shows,
  totalPages: payload.totalPages,
});

export const setReviews = (payload) => ({
  type: SET_REVIEWS,
  reviews: payload,
});

export const setCurrentMovie = (payload) => ({
  type: SET_CURRENT_MOVIE,
  currentMovie: payload.currentMovie,
  keywords: payload.keywords,
  socials: payload.socials,
  reviews: payload.reviews,
  similar: payload.similar,
});

export const setCurrentShow = (payload) => ({
  type: SET_CURRENT_SHOW,
  currentShow: payload.currentShow,
  keywords: payload.keywords,
  external_ids: payload.socials,
  reviews: payload.reviews,
  similar: payload.similar,
});

export const setShowDetails = (payload) => ({
  type: SET_DETAILS_SHOW,
  awards: payload.awards,
  director: payload.director,
  writer: payload.writer,
  actors: payload.actors,
  rated: payload.rated,
  language: payload.language,
  year: payload.year,
});

export const setDetails = (payload) => ({
  type: SET_DETAILS_MOVIE,
  awards: payload.awards,
  director: payload.director,
  writer: payload.writer,
  actors: payload.actors,
  rated: payload.rated,
  language: payload.language,
});

export const setTopMovies = (payload) => ({
  type: SET_TOP_RATED_MOVIES,
  topMovies: payload.topMovies,
  totalPages: payload.totalPages,
});

export const setPopularMovies = (payload) => ({
  type: SET_POPULAR_MOVIES,
  popularMovies: payload.popularMovies,
  totalPages: payload.totalPages,
});

export const setUpcomingMovies = (payload) => ({
  type: SET_UPCOMING_MOVIES,
  upcomingMovies: payload.upcomingMovies,
  totalPages: payload.totalPages,
});

export const setCurrentSeason = (payload) => ({
  type: SET_CURRENT_SEASON,
  episodes: payload.episodes,
  name: payload.name,
  poster_path: payload.poster_path,
  air_date: payload.air_date,
  season_number: payload.season_number,
});
