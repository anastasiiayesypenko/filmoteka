'use strict';
import EventEmitter from './services/eventemitter';
import Library from '../library-section/library';
let library = new Library();
import * as src from './image/no-image.jpg';
export default class SearchView extends EventEmitter {
  constructor() {
    super();
    this.app = document.querySelector('#app');
    this.header = document.createElement('header');
    this.header.classList.add('header');
    this.logo = document.createElement('h1');
    this.logo.textContent = 'FILM📀TEKA';
    this.navigation = document.createElement('nav');
    this.navigation.innerHTML = `<ul class="header-list">
            <li class="header-list__item">
                <a href="" class="header-list__itemlink main-link">Главная страница</a>
            </li>
            <li class="header-list__item">
                <a href="" class="header-list__itemlink library-link">Моя фильмотека</a>
            </li>
        </ul>`;
    this.wrapper = document.createElement('div');
    this.cardSection = document.createElement('section');
    this.header.append(this.logo, this.navigation);
    this.app.appendChild(this.header);
    this.drawMain.bind(this)();

    this.footer = document.createElement('footer');
    this.footer.classList.add('footer');
    this.footer.textContent = 'Made with ❤️ by Kolya Raketa';
    this.app.append(this.wrapper, this.cardSection, this.footer);
    this.mainLink = document.querySelector('.main-link');
    this.libraryLink = document.querySelector('.library-link');
    this.libraryLink.addEventListener('click', this.renderLibrary.bind(this));
    this.mainLink.addEventListener('click', this.renderMain.bind(this));

    // ==============================================

    // this.app = document.querySelector('#app');
    // this.form = document.createElement('form');
    // this.input = document.createElement('input');
    // this.form.appendChild(this.input);
    // this.form.addEventListener('submit', this.onFilmSearch.bind(this));
    this.cardSection = document.createElement('section');
    // this.app.append(this.form, this.cardSection);
    this.app.append(this.cardSection);
  }
  drawMain() {
    let title = document.createElement('h2');
    title.classList.add('h2');
    title.textContent = 'Персональная фильмотека';

    let form = document.createElement('form');
    let input = document.createElement('input');
    form.appendChild(input);
    form.classList.add('form');
    form.addEventListener('submit', this.onFilmSearch.bind(this));

    let cardList = document.createElement('ul');
    cardList.classList.add('card-section');

    let forwardButton = document.createElement('button');
    forwardButton.classList.add('pagination__forward-button');
    let backwardButton = document.createElement('button');
    backwardButton.classList.add('pagination__backward-button');
    let page = document.createElement('div');
    page.classList.add('pagination__page');
    let paginationWrapper = document.createElement('div');
    forwardButton.textContent = 'Вперед';
    backwardButton.textContent = 'Назад';
    backwardButton.addEventListener('click', this.onBackwardClick.bind(this));
    forwardButton.addEventListener('click', this.onForwardClick.bind(this));
    paginationWrapper.append(backwardButton, page, forwardButton);
    paginationWrapper.classList.add('hidden');

    this.wrapper.append(title, form);
    this.cardSection.appendChild(cardList);
  }

  renderLibrary(e) {
    e.preventDefault();
    this.title.remove();
    this.form.remove();
    this.state = history;
    window.history.pushState(null, null, 'library.html');
    if (this.forwardButton) this.forwardButton.remove();
    if (this.backwardButton) this.backwardButton.remove();
    if (this.page) this.page.remove();
    this.cardSection.textContent = '';
    this.cardSection.append(library.createHTML());
  }

  renderMain(event) {
    event.preventDefault();
    this.mainLink.href = `/?redirected=true&page=main&`;
    history.pushState(null, null, this.mainLink.href);
    let wrapper = document.querySelector('.button-container');
    wrapper.remove();
  }

  onFilmSearch(event) {
    event.preventDefault();
    let { value } = this.input;
    this.backwardButton.classList.add('hidden');
    this.forwardButton.classList.remove('hidden');
    this.page.textContent = '1';
    let pageNumber = this.page.textContent;
    this.emit('search', value, pageNumber);
    this.input.style.width = '400px';
  }
  drawCard(data) {
    let filmList = data.Search;
    console.log(filmList);
    let amountOfPages = Math.ceil(data.totalResults / 10);
    if (this.page.textContent >= amountOfPages) {
      this.forwardButton.classList.add('hidden');
    }
    this.cardList.innerHTML = '';
    let markup = filmList.map(item => {
      let card = document.createElement('li');
      let link = document.createElement('a');
      link.classList.add('card-link');
      card.classList.add('card');
      let filmTitle = document.createElement('p');
      let filmImage = document.createElement('img');
      filmTitle.textContent = item.Title;
      let { Poster } = item;
      if (Poster === 'N/A') {
        Poster = src.default;
      }
      filmImage.setAttribute('src', Poster);
      link.append(filmTitle, filmImage);
      link.dataset.id = item.imdbID;
      let movieHref = `/?redirected=true&page=movie&${link.dataset.id}`;
      link.setAttribute('href', movieHref);
      link.addEventListener('click', this.showId.bind(this));
      card.appendChild(link);
      this.cardList.appendChild(card);
    });
    this.paginationWrapper.classList.add('pagination');
  }
  
  showId(event) {
    event.preventDefault();
    history.pushState(null, null, event.target.parentNode.href);
    if (event.target.parentNode.dataset.id) {
      console.log(event.target.parentNode.dataset.id);
      let id = event.target.parentNode.dataset.id;
      this.emit('show-movie', id);
      
    drawMain() {
        let title = document.createElement('h2');
        title.classList.add('h2');
        title.textContent = 'Персональная фильмотека';

        let form = document.createElement('form');
        let input = document.createElement('input');
        form.appendChild(input);
        form.classList.add('form');
        form.addEventListener('submit', this.onFilmSearch.bind(this));

        let forwardButton = document.createElement('button');
        forwardButton.classList.add('pagination__forward-button');
        let backwardButton = document.createElement('button');
        backwardButton.classList.add('pagination__backward-button');
        let page = document.createElement('div');
        page.classList.add('pagination__page');
        let paginationWrapper = document.createElement('div');
        
        forwardButton.textContent = 'Вперед';
        backwardButton.textContent = 'Назад';
        backwardButton.addEventListener('click', this.onBackwardClick.bind(this));
        forwardButton.addEventListener('click', this.onForwardClick.bind(this));
        let cardList = document.createElement('ul');
        cardList.classList.add('card-section');
        this.cardSection.append(cardList);
        this.wrapper.append(title, form);
        paginationWrapper.append(backwardButton, page, forwardButton);
        
        this.cardSection.append(paginationWrapper);
        paginationWrapper.classList.add('hidden', 'pagination-wrapper');
    }

    renderLibrary(e){
        e.preventDefault();
        this.title.remove();
        this.form.remove();
        this.state = history;
        window.history.pushState(null, null, 'library.html');
        if(this.forwardButton) this.forwardButton.remove();
        if(this.backwardButton) this.backwardButton.remove();
        if(this.page) this.page.remove();
        this.cardSection.textContent = '';
        this.cardSection.append(library.createHTML());

  }
  onBackwardClick() {
    this.forwardButton.classList.remove('hidden');
    if (this.page.textContent >= 2) {
      let pageNumber = Number(this.page.textContent) - 1;
      this.page.textContent = pageNumber;
      let { value } = this.input;
      this.emit('move', value, pageNumber);
    }
    if (this.page.textContent === '1') {
      this.backwardButton.classList.add('hidden');
    }
  }
  onForwardClick() {
    this.backwardButton.classList.remove('hidden');
    let pageNumber = Number(this.page.textContent) + 1;
    this.page.textContent = pageNumber;
    let { value } = this.input;
    this.emit('move', value, pageNumber);
  }

  // ===================================

  isInStorage(type, imdbID) {
    const storage = localStorage.getItem(type);
    console.log(storage);
    if (!storage) {
      return false;

    onFilmSearch(event) {
        event.preventDefault();
        let forwardButton = document.querySelector('.pagination__forward-button');
        let backwardButton = document.querySelector('.pagination__backward-button');
        let page = document.querySelector('.pagination__page');
        let paginationWrapper = document.querySelector('.pagination-wrapper');
        paginationWrapper.classList.add('pagination');
        paginationWrapper.classList.remove('hidden');
        let input = document.querySelector('input');
        let { value } = input;
        backwardButton.classList.add('hidden');
        forwardButton.classList.remove('hidden');
        page.textContent = '1';
        let pageNumber = page.textContent;
        this.emit('search', value, pageNumber);
        input.style.width = '400px';


    }
      
    drawCard(data) {
        let filmList = data.Search;
        let amountOfPages = Math.ceil(data.totalResults / 10);
        let forwardButton = document.querySelector('.pagination__forward-button');
        let page = document.querySelector('.pagination__page');
        if (page.textContent >= amountOfPages) {
            forwardButton.classList.add('hidden');
        }
        let cardList = document.querySelector('.card-section');
        cardList.innerHTML = '';
        let markup = filmList.map(item => {
            let card = document.createElement('li');
            let link = document.createElement('a');
            link.classList.add('card-link');
            card.classList.add('card');
            let filmTitle = document.createElement('p');
            let filmImage = document.createElement('img');
            filmTitle.textContent = item.Title;
            let { Poster } = item;
            if ( Poster === 'N/A') {
                Poster = src.default;
            }
            filmImage.setAttribute('src', Poster);
            link.append(filmTitle, filmImage);
            link.dataset.id = item.imdbID;
            let movieHref = `/?redirected=true&page=movie&${link.dataset.id}`; 
            link.setAttribute('href', movieHref);
            link.addEventListener('click', this.showId.bind(this));
            card.appendChild(link);
            cardList.appendChild(card);
        });
        let paginationWrapper = document.querySelector('pagination-wrapper');
        paginationWrapper.classList.add('pagination');
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
      
    onBackwardClick() {
        let forwardButton = document.querySelector('.pagination__forward-button');
        let backwardButton = document.querySelector('.pagination__backward-button');

        let page = document.querySelector('.pagination__page');
        forwardButton.classList.remove('hidden');
        let input = document.querySelector('input');
        if (page.textContent >= 2) {
            let pageNumber = Number(page.textContent) - 1;
            page.textContent = pageNumber;
            let { value } = input;
            this.emit('move', value, pageNumber);
        } 
        if (page.textContent === '1') {
            backwardButton.classList.add('hidden');
        }
    }
    onForwardClick() {
        let backwardButton = document.querySelector('.pagination__backward-button');
        let page = document.querySelector('.pagination__page');
        let input = document.querySelector('input');

        backwardButton.classList.remove('hidden');
        let pageNumber = Number(page.textContent) + 1;
        page.textContent = pageNumber;
        let { value } = input;
        this.emit('move', value, pageNumber);
    }
    target.dataset.storage = !storage;
  }

  // onFilmSearch(event) {
  //   event.preventDefault();
  //   let { value } = this.input;
  //   this.emit('search', value);
  //   this.form.reset();
  // }

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
    }</span></p>
    <p class="movie-card__pretitle margin">Runtime: <span class="movie-card__description">${
      data.Runtime
    }</span></p>`;

    let filmInfo = document.createElement('div');
    filmInfo.classList.add('movie-card__info');

    filmInfo.append(filmArticle, this.renderButtons(data));

    this.card.append(filmImage, filmInfo);
    this.cardSection.appendChild(this.card);
  }

  drawMovie(data) {
    const card = this.renderCard(data);
    return card;
  }
}
