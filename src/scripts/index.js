'use strict';
import '../styles/style.sass';
import SearchView from './search-section/search-section-view';
import SearchModel from './search-section/search-section-model';
import SearchController from './search-section/search-section-controller';
import Library from './library-section/library';

const model = new SearchModel();
const view = new SearchView();
let controller = new SearchController(model, view);

const library = new Library();
console.log(library.createHTML());



