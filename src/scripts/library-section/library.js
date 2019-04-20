"use strict";

export default class Library {
  constructor() {
    let createdHTML = this.createHTML();
  }

  createHTML() {
    let container = document.createElement("div");
    container.classList.add("container");

    let linksList = document.createElement("ul");
    let itemQueue = document.createElement("li");
    let itemFavorites = document.createElement("li");
    let itemHaveSeen = document.createElement("li");
    let btnQueue = document.createElement("button");
    let btnFavorites = document.createElement("button");
    let btnHaveSeen = document.createElement("button");

    btnQueue.classList.add("js-queue");
    btnFavorites.classList.add("js-favorites");
    btnHaveSeen.classList.add("js-seen");

    let queueArr = JSON.parse(localStorage.getItem("qeue") || "[]");
    let moviesCards = this.renderContent(queueArr);

    moviesCards.classList.add("js-movies-cards");
   

    btnQueue.textContent = "Очередь просмотра";
    btnFavorites.textContent = "Избранные";
    btnHaveSeen.textContent = "Просмотренные";

    container.append(linksList);
    itemQueue.append(btnQueue);
    itemFavorites.append(btnFavorites);
    itemHaveSeen.append(btnHaveSeen);
    linksList.append(itemQueue, itemFavorites, itemHaveSeen);
    container.append(moviesCards);

    btnQueue.addEventListener("click", this.showQueue.bind(this));
    btnFavorites.addEventListener("click", this.showFavorites.bind(this));
    btnHaveSeen.addEventListener("click", this.showSeen.bind(this));

    return container;
  }

  renderContent(arr) {
    let result = document.createElement("div");
    let content = arr.reduce((acc, el) => {
      acc += `
    <div>
        <h3>${el.Title}</h3>
        <img src="${el.Poster}" alt="${el.Title}">
    </div>
    `;
      return acc;
    }, ``);
    result.innerHTML = content;
    return result;
  }

  showQueue(e) {
    const arr = JSON.parse(localStorage.getItem("qeue")) || [];
    let result = this.renderContent(arr);
    console.log(result);
    let container = document.querySelector('.js-movies-cards');
    container.textContent = '';
    container.append(result);
  }

  showFavorites(e) {
    const arr = JSON.parse(localStorage.getItem("favorites")) || [];
    let result = this.renderContent(arr);
    console.log(result);
    let container = document.querySelector('.js-movies-cards');
    container.textContent = '';
    container.append(result);
  }

  showSeen(e) {
    const arr = JSON.parse(localStorage.getItem("haveseen")) || [];
    let result = this.renderContent(arr);
    console.log(result);
    let container = document.querySelector('.js-movies-cards');
    container.textContent = '';
    container.append(result);

  }
}
