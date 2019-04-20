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


let button = document.createElement('button');
let hist = window.history;

const library = new Library();
const search = document.location.search;

//     if (!search) {
//         document.location.href = '/';
//     }
// const params = search.slice(1);
// document.location.href = `/?redirected=true&page=library&${params}`;



// const filmModel = new FilmModel();
// const filmView = new FilmView();
// let filmController = new FilmController(filmModel, filmView);

