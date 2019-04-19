'use strict';
import '../styles/style.sass';
import SearchView from './search-section/search-section-view';
import SearchModel from './search-section/search-section-model';
import SearchController from './search-section/search-section-controller';

const model = new SearchModel();
const view = new SearchView();
let controller = new SearchController(model, view);



