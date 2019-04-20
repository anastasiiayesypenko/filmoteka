'use strict';
export default class SearchController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.on('search', this.onSearch.bind(this));
    this.view.on('change on del', this.onChange.bind(this));
  }

  onChange() {
    this.view.buttonWatchedFilm.textContent = 'Удалить из просмотренных';
  }

  onSearch(value) {
    this.model.fetchFilmByTitle(value).then(data => this.view.drawCard(data));
  }
}
