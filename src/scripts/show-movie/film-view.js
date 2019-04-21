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
  }

  isInStorage(type, imdbID) {
    const storage = localStorage.getItem(type);
    console.log(storage);
    if (!storage) {
      return false;
    }
    return JSON.parse(storage).some(el => el.imdbID === imdbID);
  }

  changeValueBtnWatchedFilm({ target }, data) {
    const storage = this.isInStorage('watched', data.imdbID);
    if (storage) {
      console.log(storage);
      const filterArr = JSON.parse(localStorage.getItem('watched')).filter(
        el => el.imdbID !== data.imdbID,
      );
      localStorage.setItem('watched', JSON.stringify(filterArr));
      target.textContent = 'Добавить в просмотренные';
    } else {
      const getWatсhed = JSON.parse(localStorage.getItem('watched') || '[]');
      getWatсhed.push({
        Title: data.Title,
        Poster: data.Poster,
        Ratings: data.Ratings[0].Value,
        Ratings: data.Ratings,
        imdbID: data.imdbID,
      });
      localStorage.setItem('watched', JSON.stringify(getWatсhed));
      target.textContent = 'Удалить из просмотренных';
    }
    target.dataset.storage = !storage;
  }

  changeValueBtnPlanWatching({ target }, data) {
    const storage = this.isInStorage('plan', data.imdbID);
    if (storage) {
      const filterArr = JSON.parse(localStorage.getItem('plan')).filter(
        el => el.imdbID !== data.imdbID,
      );
      localStorage.setItem('plan', JSON.stringify(filterArr));
      target.textContent = 'Запланировать просмотр';
    } else {
      const getPlanned = JSON.parse(localStorage.getItem('plan') || '[]');
      getPlanned.push({
        Title: data.Title,
        Poster: data.Poster,
        Ratings: data.Ratings,
        imdbID: data.imdbID,
      });
      localStorage.setItem('plan', JSON.stringify(getPlanned));
      target.textContent = 'Убрать просмотр';
    }
    target.dataset.storage = !storage;
  }

  changeValueBtnAddFav({ target }, data) {
    const storage = this.isInStorage('add', data.imdbID);
    if (storage) {
      const filterArr = JSON.parse(localStorage.getItem('add')).filter(
        el => el.imdbID !== data.imdbID,
      );
      localStorage.setItem('add', JSON.stringify(filterArr));
      target.textContent = 'Добавить в избранное';
    } else {
      const getAdded = JSON.parse(localStorage.getItem('add') || '[]');
      getAdded.push({
        Title: data.Title,
        Poster: data.Poster,
        Ratings: data.Ratings,
        imdbID: data.imdbID,
      });
      localStorage.setItem('add', JSON.stringify(getAdded));
      target.textContent = 'Убрать из избранных';
    }
    target.dataset.storage = !storage;
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
    buttonPlanWatching.dataset.storage = this.isInStorage('plan');
    buttonPlanWatching.classList.add('movie-card__button');
    buttonPlanWatching.textContent = 'Запланировать просмотр';

    let buttonAddFilmInFav = document.createElement('button');
    buttonAddFilmInFav.dataset.storage = this.isInStorage('add');
    buttonAddFilmInFav.classList.add('movie-card__button');
    buttonAddFilmInFav.textContent = 'Добавить в избранное';

    let filmButtons = document.createElement('div');

    filmButtons.append(
      buttonWatchedFilm,
      buttonPlanWatching,
      buttonAddFilmInFav,
    );

    buttonWatchedFilm.addEventListener('click', event => {
      this.changeValueBtnWatchedFilm(event, data);
    });
    buttonPlanWatching.addEventListener('click', event => {
      this.changeValueBtnPlanWatching(event, data);
    });
    buttonAddFilmInFav.addEventListener('click', event => {
      this.changeValueBtnAddFav(event, data);
    });

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
      data.Ratings[0] ? data.Ratings[0].Value : (data.Ratings = 'N/A')
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
