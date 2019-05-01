'use strict';
export default class FilmModel {
  constructor() {}
  fetchFilmByTitle(imdbId) {
    const url = `https://www.omdbapi.com/?i=${imdbId}&apikey=c6c6013b`;
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
}
