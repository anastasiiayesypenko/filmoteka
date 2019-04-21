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

        let btnLibrary = document.querySelector('.library-link');
        btnLibrary.addEventListener('click', this.renderLibrary.bind(this));
    }

    renderLibrary(e){
        e.preventDefault();
        this.wrapper.remove();
        this.state = history;
        window.history.pushState(null, null, 'library.html');
        if(this.forwardButton) this.forwardButton.remove();
        if(this.backwardButton) this.backwardButton.remove();
        if(this.page) this.page.remove();
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
        };
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
