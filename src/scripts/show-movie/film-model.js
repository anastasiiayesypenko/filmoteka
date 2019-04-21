'use strict';
export default class FilmModel {
  constructor() {
    // this.urlCard = getUrlFromLocalStorage();
  }
  fetchFilmByTitle(imdbId) {
    const url = `http://www.omdbapi.com/?i=${imdbId}&apikey=c6c6013b`;
    return new Promise(resolve => {
      fetch(url)
        .then(response => {
          if (response.ok) return response.json();
          throw new Error(`Error while fetching: ${response.statusText}`);
        })
        .then(data => {
          console.log(data);
          resolve(data);
        })
        .catch(error => console.log(error));
    });
  }

  // setUrlToLocalStorage(array) {
  //   localStorage.setItem('watched', JSON.stringify(array));
  // }

  // getUrlFromLocalStorage() {
  //   let data = localStorage.getItem('watched');
  //   return data ? JSON.parse(data) : [];
  // }
}
