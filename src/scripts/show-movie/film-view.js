'use strict';
import EventEmitter from './services/eventemitter';
export default class FilmView extends EventEmitter {
  constructor() {
    super();
    this.app = document.querySelector('#app');
    this.form = document.createElement('form');
    this.input = document.createElement('input');
    this.form.appendChild(this.input);
    this.form.addEventListener('submit', this.onFilmSearch.bind(this));
    this.cardSection = document.createElement('section');
    this.app.append(this.form, this.cardSection);

    this.buttonWatchedFilm = document.createElement('button');
    this.buttonWatchedFilm.classList.add('movie-card__button');
    this.buttonWatchedFilm.textContent = 'Добавить в просмотренные';

    this.buttonPlanWatching = document.createElement('button');
    this.buttonPlanWatching.classList.add('movie-card__button');
    this.buttonPlanWatching.textContent = 'Запланировать просмотр';

    this.buttonAddFilmInFav = document.createElement('button');
    this.buttonAddFilmInFav.classList.add('movie-card__button');
    this.buttonAddFilmInFav.textContent = 'Добавить в избранное';

    this.buttonWatchedFilm.addEventListener('click', this.changeValueBtnWatchedFilm.bind(this));
    this.buttonPlanWatching.addEventListener('click', this.changeValueBtnPlanWatching.bind(this));
    this.buttonAddFilmInFav.addEventListener('click', this.changeValueBtnAddFav.bind(this));
  }



  changeValueBtnWatchedFilm() {
    this.buttonWatchedFilm.textContent = 'Удалить из просмотренных';
  }

  changeValueBtnPlanWatching() {
    this.buttonPlanWatching.textContent = 'Убрать просмотр';
  }

  changeValueBtnAddFav() {
    this.buttonAddFilmInFav.textContent = 'Убрать из избранных';
  }

  onFilmSearch(event) {
    event.preventDefault();
    let { value } = this.input;
    this.emit('search', value);
    this.form.reset();
  }
  drawCard(data) {
    this.cardSection.innerHTML = '';

    this.card = document.createElement('div');
    this.card.classList.add('movie-card');

    let filmImage = document.createElement('img');
    filmImage.setAttribute('src', data.Poster);
    filmImage.classList.add('movie-card__image');

    let filmArticle = document.createElement('div');
    filmArticle.innerHTML = `<p class="movie-card__title margin">${
      data.Title
    } <span class="movie-card__year">${data.Year}</span></p>
    <p class="margin">${data.Plot}</p>
    <p class="movie-card__pretitle margin">Awards: <span class="movie-card__description">${
      data.Awards
    }</span></p>
    <p class="movie-card__pretitle margin">Rating: <span>${
      data.Ratings // [0].Value
    }</span> <span class="movie-card__votes">${data.imdbVotes} votes</span></p>
    <p class="movie-card__pretitle margin">Actors: <span class="movie-card__description">${
      data.Actors
    }</span></p>
    <p class="movie-card__pretitle margin">Country: <span class="movie-card__description">${
      data.Country
    }</span></p>
    <p class="movie-card__pretitle margin">Genre: <span class="movie-card__description">${
      data.Genre
    }</span><p>
    <p class="movie-card__pretitle margin">Runtime: <span class="movie-card__description">${
      data.Runtime
    }</span></p>`;

    let filmButtons = document.createElement('div');

    filmButtons.append(
      this.buttonWatchedFilm,
      this.buttonPlanWatching,
      this.buttonAddFilmInFav,
    );

    let filmInfo = document.createElement('div');
    filmInfo.classList.add('movie-card__info');

    filmInfo.append(filmArticle, filmButtons);

    this.card.append(filmImage, filmInfo);
    this.cardSection.appendChild(this.card);

    return this.card;
  }
}
