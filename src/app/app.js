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
    constructor($scope, MovieService, $state, $location, $anchorScroll, $timeout, $q) {

        this.$scope = $scope;
        this.service = MovieService;
        this.$state = $state;
        this.$location = $location;
        this.$anchorScroll = $anchorScroll;
        this.$timeout = $timeout;
        this.$q = $q;
        this.$scope.movieDetails = {
            isLoading: true,
            characters: [],
            planets: [],
            starships: []
        };

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
        this.$scope.movieDetails = {
            isLoading: true,
            characters: [],
            planets: [],
            starships: []
        };
        this.$scope.movieDetails.name = movie.title;

        this.$scope.showList = true;
        this.goToBottom();

        this.getCharacters(movie.characters)
        .then(characters => {
            this.$scope.movieDetails.characters = characters.map(c => c.name)
            return this.getPlanets(movie.planets)
        })
        .then(planets => {
            this.$scope.movieDetails.planets = planets.map(p => p.name)
            return this.getStarships(movie.starships);
        })
        .then(starships => {
            this.$scope.movieDetails.starships = starships.map(s => s.name)
            this.$scope.movieDetails.isLoading = false;
        })

    }

    getPlanets(planets) {
        const promisses = []
        planets.forEach(url => {
            promisses.push(this.service.getByUrl(url));
        });
        return this.$q.all(promisses)
    }

    getStarships(starships) {
        const promisses = []
        starships.forEach(url => {
            promisses.push(this.service.getByUrl(url));
        });
        return this.$q.all(promisses)
    }

    getCharacters(characters) {
        const promisses = []
        characters.forEach(url => {
            promisses.push(this.service.getByUrl(url));
        });
        return this.$q.all(promisses)
    }

    closeDetails() {
        this.$scope.showList = false;
        this.goToTop();
    }

    goToBottom() {
        this.$location.hash('down');
        this.anchorScroll();
    }

    goToTop() {
        this.$location.hash('top');
        this.anchorScroll();
    }

    anchorScroll() {
        this.$timeout(() => {
            this.$anchorScroll();
        }, 500);
    }


}
AppCtrl.$inject = ['$scope', 'MovieService', '$state', '$location', '$anchorScroll', '$timeout', '$q']

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [uirouter])
    .config(routing)
    .directive('app', app)
    .controller('AppCtrl', AppCtrl)
    .service('MovieService', MovieService)

export default MODULE_NAME;