import React from "react";
import { CatalogueMain } from "./components/mainPage/catalogueMain";
import { MoviePage } from "./components/moviePage/moviePage";
import { Results } from "./components/searchResults/results/results";
import { ResultsExpanded } from "./components/searchResults/resultsExpanded/resultsExpanded";
import { ShowPage } from "./components/showPage/showPage";
import { TypeExpanded } from "./components/typeExpanded/typeExpanded";
import { SeasonsPage } from "./components/seasonsPage/seasonsPage";
import EpisodesPage from "./components/episodesPage/episodesPage";

export const routes = [
  {
    path: "/movflix/",
    component: CatalogueMain,
  },
  {
    path: "/movflix/catalogue",
    component: CatalogueMain,
  },
  {
    path: "/movflix/movies/page/*",
    component: MoviePage,
  },
  {
    path: "/movflix/shows/page/:id/:title",
    component: ShowPage,
  },
  {
    path: "/movflix/shows/page/:id/:title/seasons",
    component: SeasonsPage,
  },
  {
    path: "/movflix/shows/page/:id/:title/seasons/:season",
    component: EpisodesPage,
  },
  {
    path: "/movflix/search/*",
    component: Results,
  },
  {
    path: "/movflix/search/expand/*",
    component: ResultsExpanded,
  },
  {
    path: "/movflix/type/*",
    component: TypeExpanded,
  },
];

export default function withComponent(Component) {
  return function () {
    return <Component />;
  };
}
