'use strict';
export default class SearchModel {
    constructor() {

    }
    fetchFilmByTitle(title) {
        let film = fetch(`http://www.omdbapi.com/?t=${title}&apikey=c6c6013b`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(`Error while fetching: ${response.statusText}`);
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => console.log(error));
    }
    
}