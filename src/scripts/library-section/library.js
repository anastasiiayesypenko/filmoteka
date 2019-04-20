"use strict";

// let mooviesArr = [
//   {
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg",
//     Title: "Iron Man",
//     Type: "movie",
//     Year: "2008",
//     imdbID: "tt0371746"
//   },
//   {
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjE5MzcyNjk1M15BMl5BanBnXkFtZTcwMjQ4MjcxOQ@@._V1_SX300.jpg",
//     Title: "Iron Man 3",
//     Type: "movie",
//     Year: "2013",
//     imdbID: "tt1300854"
//   }
// ];

export default class Library {
    constructor(){
       let createdHTML = this.createHTML();
        console.log(createdHTML);
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

    let queueArr = JSON.parse(localStorage.getItem('qeue') || '[]');
    let moviesCards = this.renderContent(queueArr);

    moviesCards.classList.add("js-movies-cards");
    moviesCards.classList.add("container");

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
    // btnFavorites.addEventListener('click', showFavorites);
    // btnHaveSeen.addEventListener('click', showHaveSeen);

    

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
    
    const arr = localStorage.getItem("Queue") || [];
    let result = this.renderContent(arr);
    console.log(result);
  }
}

