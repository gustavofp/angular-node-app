import angular from 'angular';
import uirouter from '@uirouter/angularjs';
import routing from './app.config';

import movie from './movie/movie.directive'
import MovieCtrl from './movie/movie.controller'
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
    constructor($scope, MovieService, $state) {

        this.$scope = $scope;
        this.$state = $state;
        this.service = MovieService;

        this.$scope.openDetails = this.openDetails;

        this.service.getMovies()
        .then(res => {
            this.$scope.movies = res.results
        })
        .catch(err => err)
    }

   openDetails() {
    this.$state.go('movie')
    }

}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [uirouter])
    .directive('app', app)
    .controller('AppCtrl', AppCtrl)
    .directive('movie', movie)
    .controller('MovieCtrl', MovieCtrl)
    .service('MovieService', MovieService)
    .config(routing);

export default MODULE_NAME;