'use strict';

import '../styles/style.sass';
import '../styles/styles.scss';
import SearchView from './show-movie/show-movie-view';
import SearchModel from './show-movie/show-movie-model';
import SearchController from './show-movie/show-movie-controller';

const model = new SearchModel();
const view = new SearchView();
let controller = new SearchController(model, view);
