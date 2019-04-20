'use strict';

export default class Library {
    constructor(){

    }

    createHTML () {
        let container = document.querySelector('.container');
        container.innerHTML = '';
    
        let linksList = document.createElement('ul');
        let itemQueue = document.createElement('li');
        let itemFavorites = document.createElement('li');
        let itemHaveSeen = document.createElement('li');
        let linkQueue = document.createElement('a');
        let linkFavorites = document.createElement('a');
        let linkHaveSeen = document.createElement('a');
        let moviesCards = document.createElement('div');
    
        moviesCards.classList.add('js-movies-cards');
        moviesCards.classList.add('container');
    
        linkQueue.textContent = 'Очередь просмотра';
        linkFavorites.textContent = 'Избранные';
        linkHaveSeen.textContent = 'Просмотренные';
    
    
        container.append(linksList);
        itemQueue.append(linkQueue);
        itemFavorites.append(linkFavorites);
        itemHaveSeen.append(linkHaveSeen);
        linksList.append(itemQueue, itemFavorites, itemHaveSeen);
        container.append(moviesCards);
    }

}

