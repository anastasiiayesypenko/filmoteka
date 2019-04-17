'use strict';
import EventEmitter from "./services/eventemitter";
// require('handlebars');
// import './templates/template.hbs';
export default class SearchView extends EventEmitter {
    constructor() {
        super();
        this.app = document.querySelector('#app');
        this.header = document.createElement('header');
        this.header.classList.add('header');
        this.footer = document.createElement('footer');
        this.footer.classList.add('footer');
        this.form = document.createElement('form');
        this.input = document.createElement('input');
        this.form.appendChild(this.input);
        this.app.append(this.header, this.form, this.footer);
        this.form.addEventListener('submit', this.onFilmSearch.bind(this));
    }
    onFilmSearch(event) {
        event.preventDefault();
        let { value } = this.input;
        this.emit('search', value);
        this.form.reset();
    }  
    // drawItems(data) {
    //     let source = document.querySelector('#film-card').innerHTML.trim();
    //     console.log(source);
    //     let templateFunction = Handlebars.compile(source);
    //     let markup = 
    //     this.app.appendChild()
    // }
}
