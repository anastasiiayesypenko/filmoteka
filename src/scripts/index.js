'use strict';
import '../styles/style.sass';
import SearchView from './search-section/search-section-view';
import SearchModel from './search-section/search-section-model';
import SearchController from './search-section/search-section-controller';


const model = new SearchModel();
const view = new SearchView();
const controller = new SearchController(model, view);


window.onpopstate = function(event) {
    view.onRender(document.location.pathname);
};
window.onload = function(event) {
    view.onRender(document.location.pathname);
};

