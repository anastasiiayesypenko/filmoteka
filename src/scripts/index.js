"use strict";
import "../styles/style.sass";
import SearchView from "./search-section/search-section-view";
import SearchModel from "./search-section/search-section-model";
import SearchController from "./search-section/search-section-controller";
import FilmView from "./show-movie/film-view";
import FilmModel from "./show-movie/film-model";
import FilmController from "./show-movie/film-controller";
import Library from "./library-section/library";

const model = new SearchModel();
const view = new SearchView();
const controller = new SearchController(model, view);

const library = new Library();

let a = [
  {
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_SX300.jpg",
    Title: "Iron Man 2",
    Type: "movie",
    Year: "2010",
    imdbID: "tt1228705"
  },
  {
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZjM2YzcxMmQtOTc2Mi00YjdhLWFlZjUtNmFmMDQzYzU2YTk5L2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
    Title: "The Man in the Iron Mask",
    Type: "movie",
    Year: "1998",
    imdbID: "tt0120744"
  }
];

let b = [
  {
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMTM2MDg5MzgxNF5BMl5BanBnXkFtZTcwODUzNjMxOA@@._V1_SX300.jpg",
    Title: "Iron Sky",
    Type: "movie",
    Year: "2012",
    imdbID: "tt1034314"
  },
  {
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMTM2MDg5MzgxNF5BMl5BanBnXkFtZTcwODUzNjMxOA@@._V1_SX300.jpg",
    Title: "Iron Sky",
    Type: "movie",
    Year: "2012",
    imdbID: "tt1034314"
  }
];

// const filmModel = new FilmModel();
// const filmView = new FilmView();
// let filmController = new FilmController(filmModel, filmView);
