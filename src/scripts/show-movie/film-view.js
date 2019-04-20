'use strict';
import EventEmitter from './services/eventemitter';
import { DH_CHECK_P_NOT_SAFE_PRIME } from 'constants';
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

    // this.buttonWatchedFilm = document.createElement('button');
    // this.buttonWatchedFilm.dataset.storage = this.isInStorage('watched');
    // this.buttonWatchedFilm.classList.add('movie-card__button');
    // this.buttonWatchedFilm.textContent = 'Добавить в просмотренные';

    // this.buttonPlanWatching = document.createElement('button');
    // this.buttonPlanWatching.classList.add('movie-card__button');
    // this.buttonPlanWatching.textContent = 'Запланировать просмотр';

    // this.buttonAddFilmInFav = document.createElement('button');
    // this.buttonAddFilmInFav.classList.add('movie-card__button');
    // this.buttonAddFilmInFav.textContent = 'Добавить в избранное';

    // this.buttonWatchedFilm.addEventListener(
    //   'click',
    //   this.changeValueBtnWatchedFilm.bind(this),
    // );
    // this.buttonPlanWatching.addEventListener(
    //   'click',
    //   this.changeValueBtnPlanWatching.bind(this),
    // );
    // this.buttonAddFilmInFav.addEventListener(
    //   'click',
    //   this.changeValueBtnAddFav.bind(this),
    // );
  }

  isInStorage(type, id) {
    const storage = localStorage.getItem(type);
    if (!storage) {
      return false;
    }
    return JSON.parse(storage).some(el => el.id === id);
  }

  changeValueBtnWatchedFilm({ target }, data) {
    const storage = this.isInStorage('watched');
    if (storage) {
      target.textContent = 'Удалить из просмотренных';
    } else {
      const getWathced = JSON.parse(localStorage.getItem('watched') || '[]');
      getWathced.push({
        Title: data.Title,
        Poster: data.Poster,
        Ratings: data.Ratings[0].Value,
      });
      localStorage.setItem('watched', JSON.stringify(getWathced));
      this.buttonWatchedFilm.textContent = 'Добавить в просмотренные';
    }

    target.dataset.storage = !storage;
    console.log(storage);
    // this.buttonWatchedFilm.addEventListener(
    //   'click',
    //   this.changeValueWatchedOnAdd.bind(this),
    // );
    // this.buttonWatchedFilm.removeEventListener(
    //   'click',
    //   this.changeValueBtnWatchedFilm.bind(this),
    // );
  }

  changeValueWatchedOnAdd() {
    this.buttonWatchedFilm.textContent = 'Добавить в просмотренные';
    this.buttonWatchedFilm.addEventListener(
      'click',
      this.changeValueBtnWatchedFilm.bind(this),
    );
    this.buttonWatchedFilm.removeEventListener(
      'click',
      this.changeValueWatchedOnAdd.bind(this),
    );
  }

  changeValueBtnPlanWatching() {
    this.buttonPlanWatching.textContent = 'Убрать просмотр';
    this.buttonPlanWatching.addEventListener(
      'click',
      this.changeValuePlanOnAdd.bind(this),
    );
    this.buttonPlanWatching.removeEventListener(
      'click',
      this.changeValueBtnPlanWatching.bind(this),
    );
  }

  changeValuePlanOnAdd() {
    this.buttonPlanWatching.textContent = 'Запланировать просмотр';
    this.buttonPlanWatching.addEventListener(
      'click',
      this.changeValueBtnPlanWatching.bind(this),
    );
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

  renderButtons(data) {
    let buttonWatchedFilm = document.createElement('button');
    buttonWatchedFilm.dataset.storage = this.isInStorage('watched');
    buttonWatchedFilm.classList.add('movie-card__button');
    buttonWatchedFilm.textContent = 'Добавить в просмотренные';

    let buttonPlanWatching = document.createElement('button');
    buttonPlanWatching.classList.add('movie-card__button');
    buttonPlanWatching.textContent = 'Запланировать просмотр';

    let buttonAddFilmInFav = document.createElement('button');
    buttonAddFilmInFav.classList.add('movie-card__button');
    buttonAddFilmInFav.textContent = 'Добавить в избранное';

    let filmButtons = document.createElement('div');

    filmButtons.append(
      buttonWatchedFilm,
      buttonPlanWatching,
      buttonAddFilmInFav,
    );

    buttonWatchedFilm.addEventListener(
      'click',
      // this.changeValueBtnWatchedFilm.bind(this),
      event => {
        this.changeValueBtnWatchedFilm(event, data);
      },
    );
    buttonPlanWatching.addEventListener(
      'click',
      this.changeValueBtnPlanWatching.bind(this),
    );
    buttonAddFilmInFav.addEventListener(
      'click',
      this.changeValueBtnAddFav.bind(this),
    );

    return filmButtons;
  }

  renderCard(data) {
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

    // let filmButtons = document.createElement('div');

    // filmButtons.append(
    //   this.buttonWatchedFilm,
    //   this.buttonPlanWatching,
    //   this.buttonAddFilmInFav,
    // );

    let filmInfo = document.createElement('div');
    filmInfo.classList.add('movie-card__info');

    filmInfo.append(filmArticle, this.renderButtons(data));

    this.card.append(filmImage, filmInfo);
    this.cardSection.appendChild(this.card);
  }

  drawCard(data) {
    const card = this.renderCard(data);
    return card;
  }
}
