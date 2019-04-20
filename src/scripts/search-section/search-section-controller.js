'use strict';
export default class SearchController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.on('search', this.onSearch.bind(this));
        this.view.on('move', this.onMove.bind(this));
    }
    onSearch(value, page) {
        this.model.fetchFilmByTitle(value, page)
        .then(data => this.view.drawCard(data));
    }
    onMove(value, page) {
        this.model.fetchFilmByTitle(value, page)
        .then(data => this.view.drawCard(data));
    }
}