

let movie = () => {
  return {
    template: require('./movie.html'),
    controller: 'MovieCtrl',
    controllerAs: 'movie'
  }
};

export default movie;