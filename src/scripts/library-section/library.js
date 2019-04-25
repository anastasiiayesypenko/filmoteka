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
    let result = document.createElement("ul");
    result.classList.add('js-movies-cards');
     let content = arr.reduce((acc, el) => {
      acc += `
    <li class="card" style = "padding:10px" data-id="${el.imdbID}">
      <a href="" class="card__link" data-id="${el.imdbID}">
        <h3>${el.Title}</h3>
        <img src="${el.Poster}" alt="${el.Title}">
      </a>
    </li>
    `;
      return acc;
    }, ``);
    result.innerHTML = content;

    return result;
  }

  onFilmCardClick(event) {
    event.preventDefault();
    history.pushState(null, null, `/movie.html?imdbID=${event.target.parentNode.dataset.id}`);

    this.emit('renderFilm', event.target.parentNode.dataset.id);
    console.log(event.target.parentNode.dataset.id);
  }

  showQueue(e) {
    const arr = JSON.parse(localStorage.getItem("plan")) || [];
    let result = this.renderContent(arr);
    this.moviesCards = result;
    let elem = document.querySelector('.js-movies-cards');
    elem.remove();
    let container = document.querySelector('.button-container');
    container.append(result);
    let cardLink = document.querySelectorAll('.card__link');
    
    for (let link of cardLink) {
      console.log(link);
      link.addEventListener('click', this.onFilmCardClick.bind(this));
    }
  }

  showFavorites(e) {
    const arr = JSON.parse(localStorage.getItem("add")) || [];
    let result = this.renderContent(arr);
    this.moviesCards = result;
    let elem = document.querySelector('.js-movies-cards');
    elem.remove();
    let container = document.querySelector('.button-container');

    container.append(result);
    let cardLink = document.querySelectorAll('.card__link');
    console.log(cardLink);
    for (let link of cardLink) {
      link.addEventListener('click', this.onFilmCardClick.bind(this));
    }
  }

  showSeen(e) {
    const arr = JSON.parse(localStorage.getItem("watched")) || [];
    let result = this.renderContent(arr);
    this.moviesCards = result;
    let elem = document.querySelector('.js-movies-cards');
    elem.remove();
    let container = document.querySelector('.button-container');
    container.append(result);
    let cardLink = document.querySelectorAll('.card__link');
    console.log(cardLink);
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

  searchByID(e){
    console.log(e.target);
    const url = `http://www.omdbapi.com/?i=${imdbId}&apikey=c6c6013b`;
    return new Promise(resolve => {
      fetch(url)
        .then(response => {
          if (response.ok) return response.json();
          throw new Error(`Error while fetching: ${response.statusText}`);
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => console.log(error));
    });
  }
}
