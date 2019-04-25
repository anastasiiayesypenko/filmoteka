'use strict';
export default class SearchController {
  constructor(model, view, library) {
    this.model = model;
    this.view = view;
    this.library = library;
    this.view.on('search', this.onSearch.bind(this));
    this.view.on('move', this.onMove.bind(this));
    this.view.on('show-movie', this.onShow.bind(this));
    this.view.on('renderFilm', this.onFilmRender.bind(this));
    this.library.on('renderFilm', this.onFilmRender.bind(this));
  }

  onShow(value) {
    this.model.fetchFilmById(value).then(data => this.view.drawMovie(data));
  }
  onFilmRender(value) {
    this.model.fetchFilmById(value).then(data => this.view.drawMovie(data));
  }

  onSearch(value, page) {
    this.model
      .fetchFilmByTitle(value, page)
      .then(data => this.view.drawCard(data));
  }
  onMove(value, page) {
    this.model
      .fetchFilmByTitle(value, page)
      .then(data => this.view.drawCard(data));
  }
}
