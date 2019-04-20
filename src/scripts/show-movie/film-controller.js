'use strict';
export default class FilmController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.on('search', this.onSearch.bind(this));
  }

  onSearch(value) {
    this.model.fetchFilmByTitle(value).then(data => this.view.drawCard(data));
  }
}
