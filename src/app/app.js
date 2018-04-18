import angular from 'angular';

import MovieService from './service/movie.service'

import '../style/app.css';

let app = () => {
    return {
        template: require('./app.html'),
        controller: 'AppCtrl',
        controllerAs: 'app'
    }
};

class AppCtrl {
    constructor(MovieService) {
        this.url = 'https://github.com/preboot/angular-webpack';
        this.service = MovieService;

        this.movies = [];

        this.getMovies()
    }

    getMovies() {
        this.service.getMovies().then(res => this.movies = res)
    };

}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
    .directive('app', app)
    .controller('AppCtrl', AppCtrl)
    .service('MovieService', MovieService)

export default MODULE_NAME;