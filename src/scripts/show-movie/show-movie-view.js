'use strict';
import EventEmitter from './services/eventemitter';
// require('handlebars');
// import './templates/template.hbs';
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
                <a href="" class="header-list__itemlink">Главная страница</a>
            </li>
            <li class="header-list__item">
                <a href="" class="header-list__itemlink">Моя фильмотека</a>
            </li>
        </ul>`;
    this.header.append(this.logo, this.navigation);
    this.title = document.createElement('h2');
    this.title.textContent = 'Персональная фильмотека';
    this.form = document.createElement('form');
    this.input = document.createElement('input');
    this.form.appendChild(this.input);
    this.form.addEventListener('submit', this.onFilmSearch.bind(this));
    this.cardSection = document.createElement('section');
    this.app.append(this.header, this.title, this.form, this.cardSection);
  }
  onFilmSearch(event) {
    event.preventDefault();
    let { value } = this.input;
    this.emit('search', value);
    this.form.reset();
  }
  drawCard(data) {
    this.cardSection.innerHTML = '';

    let card = document.createElement('div');
    card.classList.add('movie-card');

    let filmImage = document.createElement('img');
    filmImage.setAttribute('src', data.Poster);
    filmImage.classList.add('movie-card__image');

    let filmArticle = document.createElement('div');
    filmArticle.innerHTML = `<p class="movie-card__title">${
      data.Title
    } <span class="movie-card__year">${data.Year}</span></p>
    <p>${data.Plot}</p>
    <p class="movie-card__pretitle">Awards: <span class="movie-card__description">${
      data.Awards
    }</span></p>
    <p class="movie-card__pretitle">Rating: <span>${
      data.Ratings[0].Value
    }</span> <span class="movie-card__votes">${data.imdbVotes} votes</span></p>
    <p class="movie-card__pretitle">Actors: <span class="movie-card__description">${
      data.Actors
    }</span></p>
    <p class="movie-card__pretitle">Country: <span class="movie-card__description">${
      data.Country
    }</span></p>
    <p class="movie-card__pretitle">Genre: <span class="movie-card__description">${
      data.Genre
    }</span><p>
    <p class="movie-card__pretitle">Runtime: <span class="movie-card__description">${
      data.Runtime
    }</span></p>`;

    let filmButtons = document.createElement('div');
    filmButtons.innerHTML = `<button class="movie-card__button">Удалить из просмотренных</button>
    <button class="movie-card__button">Запланировать просмотр</button>
    <button class="movie-card__button">Добавить в избранное</button>`;

    let filmInfo = document.createElement('div');
    filmInfo.classList.add('movie-card__info');

    filmInfo.append(filmArticle, filmButtons);

    card.append(filmImage, filmInfo);
    this.cardSection.appendChild(card);
  }
}

// ===============================================================

// export default class SearchView extends EventEmitter {
//   constructor() {
//     super();
//     this.app = document.querySelector('#app');
//     this.header = document.createElement('header');
//     this.header.classList.add('header');
//     this.logo = document.createElement('h1');
//     this.logo.textContent = 'FILM📀TEKA';
//     this.navigation = document.createElement('nav');
//     this.navigation.innerHTML = `<ul class="header-list">
//             <li class="header-list__item">
//                 <a href="" class="header-list__itemlink">Главная страница</a>
//             </li>
//             <li class="header-list__item">
//                 <a href="" class="header-list__itemlink">Моя фильмотека</a>
//             </li>
//         </ul>`;
//     this.header.append(this.logo, this.navigation);
//     this.title = document.createElement('h2');
//     this.title.textContent = 'Персональная фильмотека';
//     this.form = document.createElement('form');
//     this.input = document.createElement('input');
//     this.form.appendChild(this.input);
//     this.form.addEventListener('submit', this.onFilmSearch.bind(this));
//     this.cardSection = document.createElement('section');
//     this.app.append(this.header, this.title, this.form, this.cardSection);
//   }
//   onFilmSearch(event) {
//     event.preventDefault();
//     let { value } = this.input;
//     this.emit('search', value);
//     this.form.reset();
//   }
//   drawCard(data) {
//     this.cardSection.innerHTML = '';
//     let markup = data.map(item => {
//       let card = document.createElement('div');
//       let filmTitle = document.createElement('p');
//       let filmImage = document.createElement('img');
//       filmTitle.textContent = item.Title;
//       filmImage.setAttribute('src', item.Poster);
//       card.append(filmTitle, filmImage);
//       this.cardSection.appendChild(card);
//     });
//   }
// }
