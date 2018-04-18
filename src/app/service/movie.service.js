'use strict';

const API_URL = "https://swapi.co/api"

export default class MovieService {

    constructor($http) {
        this._$http = $http;
    }


    getMovies() {
        return this._$http.get(`${API_URL}/films/`).then(res => res.data).catch(err => err)
    }

    getByUrl(url) {
        return this._$http.get(url).then(res => res.data).catch(err => err)
    }

}

MovieService.$inject = ['$http'];