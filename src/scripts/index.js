'use strict';
import '../styles/style.sass';
import SearchView from './search-section/search-section-view';
import SearchModel from './search-section/search-section-model';
import SearchController from './search-section/search-section-controller';
import FilmView from './show-movie/film-view';
import FilmModel from './show-movie/film-model';
import FilmController from './show-movie/film-controller';
import Library from './library-section/library';

const model = new SearchModel();
const view = new SearchView();
let controller = new SearchController(model, view);

// const filmModel = new FilmModel();
// const filmView = new FilmView();
// let filmController = new FilmController(filmModel, filmView);

