routing.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider'];

export default function routing($urlRouterProvider, $locationProvider, $stateProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('login', {
      url: '/movie',
      template: require('./movie/movie.html'),
      controller: 'MovieCtrl',
      controllerAs: 'movie'
    });
}