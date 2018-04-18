import angular from 'angular';
import uirouter from '@uirouter/angularjs';
import routing from './app.config';

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
        this.service = MovieService;
        this.$state = $state;
        
        this.$scope.list = {};
        this.$scope.showList = false;

        this.service.getMovies()
        .then(res => {
            this.$scope.movies = res.results
            this.$state.go('app.movie');
        })
        .catch(err => err)
    }

    openDetails(movie) {
        this.$scope.showList = true;
        this.$scope.movie = movie;
    }

}
AppCtrl.$inject = ['$scope', 'MovieService', '$state']

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [uirouter])
    .config(routing)
    .directive('app', app)
    .controller('AppCtrl', AppCtrl)
    .service('MovieService', MovieService)

export default MODULE_NAME;