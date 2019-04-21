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
const controller = new SearchController(model, view);


window.onpopstate = function(event) {
    view.onRendrer(document.location.pathname);
};
