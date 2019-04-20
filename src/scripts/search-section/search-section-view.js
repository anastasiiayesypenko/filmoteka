'use strict';
import EventEmitter from "./services/eventemitter";
import Library from "../library-section/library";
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
        this.navigation.innerHTML = 
        `<ul class="header-list">
            <li class="header-list__item">
                <a href="" class="header-list__itemlink main-link">Главная страница</a>
            </li>
            <li class="header-list__item">
                <a href="" class="header-list__itemlink library-link">Моя фильмотека</a>
            </li>
        </ul>`;
        this.header.append(this.logo, this.navigation);
        this.title = document.createElement('h2');
        this.title.classList.add('h2');
        this.title.textContent = 'Персональная фильмотека';

        this.form = document.createElement('form');
        this.input = document.createElement('input');
        this.form.appendChild(this.input);
        this.form.classList.add('form');
        this.form.addEventListener('submit', this.onFilmSearch.bind(this));

        this.cardSection = document.createElement('section');
        this.cardList = document.createElement('ul');
        this.cardList.classList.add('card-section');
        this.cardSection.appendChild(this.cardList);

        this.forwardButton = document.createElement('button');
        this.forwardButton.classList.add('pagination__forward-button');
        this.backwardButton = document.createElement('button');
        this.backwardButton.classList.add('pagination__backward-button');
        this.page = document.createElement('div');
        this.page.classList.add('pagination__page');
        this.paginationWrapper = document.createElement('div');
        this.forwardButton.textContent = 'Вперед';
        this.backwardButton.textContent = 'Назад';
        this.backwardButton.addEventListener('click', this.onBackwardClick.bind(this));
        this.forwardButton.addEventListener('click', this.onForwardClick.bind(this));
        this.paginationWrapper.append(this.backwardButton, this.page, this.forwardButton);
        this.paginationWrapper.classList.add('hidden');

        this.footer = document.createElement('footer');
        this.footer.classList.add('footer');
        this.footer.textContent = 'Made with ❤️ by Kolya Raketa';
        this.app.append(this.header, this.title, this.form, this.cardSection, this.paginationWrapper, this.footer);
        this.mainLink = document.querySelector('.main-link');
        this.libraryLink = document.querySelector('.library-link');
        this.libraryLink.addEventListener('click', this.renderLibrary.bind(this));

    }

    renderLibrary(e){
        e.preventDefault();
        this.title.remove();
        this.form.remove();
        if(this.forwardButton) this.forwardButton.remove();
        if(this.backwardButton) this.backwardButton.remove();
        if(this.page) this.page.remove();
        this.cardSection.textContent = '';
        this.cardSection.append(library.createHTML());
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
        let amountOfPages = Math.ceil(data.totalResults / 10);
        if (this.page.textContent >= amountOfPages) {
            this.forwardButton.classList.add('hidden');
        }
        this.cardList.innerHTML = '';
        let markup = filmList.map(item => {
            let card = document.createElement('li');
            let link = document.createElement('a');
            card.classList.add('card');
            let filmTitle = document.createElement('p');
            let filmImage = document.createElement('img');
            filmTitle.textContent = item.Title;
            let { Poster } = item;
            if ( Poster === 'N/A') {
                Poster = src.default;
            }
            filmImage.setAttribute('src', Poster);
            card.appendChild(link);
            link.append(filmTitle, filmImage);
            this.cardList.appendChild(card);
        });
        this.paginationWrapper.classList.add('pagination');
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

}
