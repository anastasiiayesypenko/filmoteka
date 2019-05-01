'use strict';
import EventEmitter from '../search-section/services/eventemitter';
export default class Library extends EventEmitter {
  constructor() {
    super();
    this.moviesCards;
  }

  createHTML() {
    let container = document.createElement('div');
    container.classList.add('button-container');
    container.classList.add('container');

    let linksList = document.createElement('ul');
    let itemQueue = document.createElement('li');
    let itemFavorites = document.createElement('li');
    let itemHaveSeen = document.createElement('li');
    let btnQueue = document.createElement('button');
    let btnFavorites = document.createElement('button');
    let btnHaveSeen = document.createElement('button');

    btnQueue.classList.add('button-container__button', 'active');
    btnFavorites.classList.add('button-container__button');
    btnHaveSeen.classList.add('button-container__button');
    linksList.classList.add('button-list');

    let queueArr = JSON.parse(localStorage.getItem('plan') || '[]');
    let moviesCards = this.renderContent(queueArr);

    btnQueue.textContent = 'Очередь просмотра';
    btnFavorites.textContent = 'Избранные';
    btnHaveSeen.textContent = 'Просмотренные';

    container.append(linksList);
    itemQueue.append(btnQueue);
    itemFavorites.append(btnFavorites);
    itemHaveSeen.append(btnHaveSeen);
    linksList.append(itemQueue, itemFavorites, itemHaveSeen);
    container.append(moviesCards);

    btnQueue.addEventListener('click', this.showQueue.bind(this));
    btnFavorites.addEventListener('click', this.showFavorites.bind(this));
    btnHaveSeen.addEventListener('click', this.showSeen.bind(this));
    linksList.addEventListener('click', this.chooseActive.bind(this));

    return container;
  }

  renderContent(arr) {
    let result = document.createElement('ul');
    result.classList.add('js-movies-cards');
    let content = arr.reduce((acc, el) => {
      acc += `
    <li class="card" style = "padding:10px" data-id="${el.imdbID}">
    <div class="card__titlecontainer"><h3 class="card__title">${
      el.Title
    }</h3><p class="rate">${el.Ratings[0].Value.substring(0, 3)}</p></div>
    <a href="" class="card__link" data-id="${el.imdbID}">
        <img src="${el.Poster}" alt="${el.Title}">
      </a>
    </li>
    `;
      return acc;
    }, ``);
    result.innerHTML = content;
    if (arr.length === 0)
      result.innerHTML =
        '<p class="empty">Пустота <span class="empty__emoji">&#128532</span></p>';

    return result;
  }

  onFilmCardClick(event) {
    event.preventDefault();
    history.pushState(
      null,
      null,
      `/movie.html?imdbID=${event.target.parentNode.dataset.id}`,
    );

    this.emit('renderFilm', event.target.parentNode.dataset.id);
  }

  showQueue(e) {
    const arr = JSON.parse(localStorage.getItem('plan')) || [];
    let result = this.renderContent(arr);
    this.moviesCards = result;
    let elem = document.querySelector('.js-movies-cards');
    elem.remove();
    let container = document.querySelector('.button-container');
    container.append(result);
    let cardLink = document.querySelectorAll('.card__link');

    for (let link of cardLink) {
      link.addEventListener('click', this.onFilmCardClick.bind(this));
    }
  }

  showFavorites(e) {
    const arr = JSON.parse(localStorage.getItem('add')) || [];
    let result = this.renderContent(arr);
    this.moviesCards = result;
    let elem = document.querySelector('.js-movies-cards');
    elem.remove();
    let container = document.querySelector('.button-container');

    container.append(result);
    let cardLink = document.querySelectorAll('.card__link');
    for (let link of cardLink) {
      link.addEventListener('click', this.onFilmCardClick.bind(this));
    }
  }

  showSeen(e) {
    const arr = JSON.parse(localStorage.getItem('watched')) || [];
    let result = this.renderContent(arr);
    this.moviesCards = result;
    let elem = document.querySelector('.js-movies-cards');
    elem.remove();
    let container = document.querySelector('.button-container');
    container.append(result);
    let cardLink = document.querySelectorAll('.card__link');
    for (let link of cardLink) {
      link.addEventListener('click', this.onFilmCardClick.bind(this));
    }
  }

  chooseActive(e) {
    let btns = document.querySelectorAll('.button-container__button');
    [...btns].forEach(btn => {
      if (e.target === btn) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
}
